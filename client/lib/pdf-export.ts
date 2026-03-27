import jsPDF from "jspdf";
import { CartItem } from "@/contexts/CartContext";

export const generatePDF = async (
  items: CartItem[],
  totalSize: string,
  totalPrice: number
): Promise<void> => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Color scheme matching the site
  const primaryColor = [180, 95, 39]; // #B45F27
  const secondaryColor = [232, 148, 74]; // #E8944A
  const darkColor = [13, 13, 15]; // #0D0D0F
  const textColor = [51, 51, 51]; // Dark gray

  // Header
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 30, "F");

  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.text("ABA PRO GAMES", 15, 20);

  pdf.setFontSize(10);
  pdf.text("Order Receipt", 15, 26);

  // Order info section
  yPosition = 45;
  pdf.setTextColor(...textColor);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Order Details", 15, yPosition);

  yPosition += 10;
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");

  const orderDate = new Date().toLocaleDateString();
  const orderId = `ORDER-${Date.now()}`;

  pdf.text(`Order ID: ${orderId}`, 15, yPosition);
  yPosition += 7;
  pdf.text(`Date: ${orderDate}`, 15, yPosition);

  // Game items table
  yPosition += 15;
  pdf.setFillColor(...secondaryColor);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);

  // Table headers
  const headers = ["Game Name", "ID", "Size", "Qty", "Price"];
  const columnWidths = [80, 35, 25, 15, 30];
  let xPosition = 15;

  headers.forEach((header, index) => {
    pdf.text(header, xPosition, yPosition);
    xPosition += columnWidths[index];
  });

  // Table rows
  yPosition += 8;
  pdf.setTextColor(...textColor);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  items.forEach((item) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    xPosition = 15;
    const gamePrice = `$${(item.price * item.quantity).toFixed(2)}`;

    // Draw alternating background
    if (items.indexOf(item) % 2 === 0) {
      pdf.setFillColor(240, 240, 240);
      pdf.rect(15, yPosition - 4, pageWidth - 30, 7, "F");
    }

    // Text
    pdf.setTextColor(...textColor);

    // Truncate game name if too long
    const gameName = item.title.length > 35 ? item.title.substring(0, 32) + "..." : item.title;
    pdf.text(gameName, xPosition, yPosition);
    xPosition += columnWidths[0];

    pdf.text(item.id, xPosition, yPosition);
    xPosition += columnWidths[1];

    pdf.text(item.size, xPosition, yPosition);
    xPosition += columnWidths[2];

    pdf.text(item.quantity.toString(), xPosition, yPosition);
    xPosition += columnWidths[3];

    pdf.text(gamePrice, xPosition, yPosition);

    yPosition += 8;
  });

  // Totals section
  yPosition += 5;
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.5);
  pdf.line(15, yPosition, pageWidth - 15, yPosition);

  yPosition += 8;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);

  const summaryX = pageWidth - 60;

  pdf.text("Total Items:", summaryX, yPosition);
  pdf.setFont("helvetica", "normal");
  pdf.text(items.reduce((sum, item) => sum + item.quantity, 0).toString(), summaryX + 45, yPosition);

  yPosition += 8;
  pdf.setFont("helvetica", "bold");
  pdf.text("Total Size:", summaryX, yPosition);
  pdf.setFont("helvetica", "normal");
  pdf.text(totalSize, summaryX + 45, yPosition);

  yPosition += 8;
  pdf.setFont("helvetica", "bold");
  pdf.text("Total Price:", summaryX, yPosition);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...secondaryColor);
  pdf.text(`$${totalPrice.toFixed(2)}`, summaryX + 45, yPosition);

  // Footer
  pdf.setTextColor(150, 150, 150);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(
    "Thank you for your purchase! This receipt contains your order details and game information.",
    15,
    pageHeight - 15
  );

  // Save the PDF
  pdf.save(`ABA_Games_Order_${orderId}.pdf`);

  // Also generate a text file
  generateTextFile(items, totalSize, totalPrice, orderId);
};

const generateTextFile = (
  items: CartItem[],
  totalSize: string,
  totalPrice: number,
  orderId: string
): void => {
  const orderDate = new Date().toLocaleDateString();

  let textContent = "ABA PRO GAMES - ORDER RECEIPT\n";
  textContent += "==================================================\n\n";
  textContent += `Order ID: ${orderId}\n`;
  textContent += `Date: ${orderDate}\n\n`;

  textContent += "GAMES:\n";
  textContent += "--------------------------------------------------\n";
  textContent += "Name                           | Size     | Price   \n";
  textContent += "--------------------------------------------------\n";

  items.forEach((item) => {
    const price = `$${(item.price * item.quantity).toFixed(2)}`;
    textContent += `${item.title.padEnd(30)} | ${item.size.padEnd(8)} | ${price.padEnd(8)}\n`;
    textContent += `ID: ${item.id}\n`;
  });

  textContent += "--------------------------------------------------\n";
  textContent += `Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n`;
  textContent += `Total Size: ${totalSize}\n`;
  textContent += `Total Price: $${totalPrice.toFixed(2)}\n`;
  textContent += "==================================================\n";
  textContent += "Thank you for your purchase!\n";

  // Create and download text file
  const element = document.createElement("a");
  element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(textContent)}`);
  element.setAttribute("download", `ABA_Games_Order_${orderId}.txt`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
