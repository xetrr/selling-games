import jsPDF from "jspdf";
import { CartItem } from "@/contexts/CartContext";

export interface PDFConfig {
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  invoiceNumber?: string;
  taxRate?: number;
  currency?: string;
  headerImage?: string;
  footerText?: string;
}

export const generatePDF = async (
  items: CartItem[],
  totalSize: string,
  totalPrice: number,
  config: PDFConfig = {}
): Promise<void> => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Configuration with defaults
  const {
    companyName = "ABA PRO GAMES",
    companyEmail = "aba@abaprogames.com",
    companyPhone = "+20 121 083 8049",
    invoiceNumber = `ORDER-${Date.now()}`,
    taxRate = 0,
    currency = "$",
    footerText = "Thank you for your purchase! This receipt contains your order details and game information.",
  } = config;

  // Color scheme matching the site
  const primaryColor = [180, 95, 39]; // #B45F27
  const secondaryColor = [232, 148, 74]; // #E8944A
  const darkColor = [13, 13, 15]; // #0D0D0F
  const textColor = [51, 51, 51]; // Dark gray

  // Header
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 40, "F");

  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.text(companyName, 15, 20);

  pdf.setFontSize(10);
  pdf.setTextColor(232, 148, 74);
  pdf.text("Order Receipt / Invoice", 15, 28);

  // Company info (top right)
  pdf.setFontSize(8);
  pdf.setTextColor(...textColor);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${companyEmail}`, pageWidth - 50, 20);
  pdf.text(`${companyPhone}`, pageWidth - 50, 25);

  // Order info section
  yPosition = 50;
  pdf.setTextColor(...textColor);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Order Details", 15, yPosition);

  yPosition += 10;
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");

  const orderDate = new Date().toLocaleDateString();
  const orderTime = new Date().toLocaleTimeString();

  pdf.text(`Invoice #: ${invoiceNumber}`, 15, yPosition);
  yPosition += 6;
  pdf.text(`Date: ${orderDate}`, 15, yPosition);
  yPosition += 6;
  pdf.text(`Time: ${orderTime}`, 15, yPosition);

  // Game items table
  yPosition += 15;

  // Draw table header background
  pdf.setFillColor(...secondaryColor);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);

  // Table headers
  const headers = ["Game Name", "ID", "Size", "Qty", "Unit Price", "Total"];
  const columnWidths = [75, 30, 20, 12, 20, 23];
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

  items.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 20;
    }

    xPosition = 15;
    const unitPrice = `${currency}${item.price.toFixed(2)}`;
    const totalPrice = `${currency}${(item.price * item.quantity).toFixed(2)}`;

    // Draw alternating background
    if (index % 2 === 0) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(15, yPosition - 4, pageWidth - 30, 6, "F");
    }

    // Text
    pdf.setTextColor(...textColor);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

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

    pdf.text(unitPrice, xPosition, yPosition);
    xPosition += columnWidths[4];

    pdf.text(totalPrice, xPosition, yPosition);

    yPosition += 6.5;
  });

  // Totals section
  yPosition += 5;
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.5);
  pdf.line(15, yPosition, pageWidth - 15, yPosition);

  yPosition += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...textColor);

  const summaryX = pageWidth - 80;
  const subtotal = totalPrice;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  // Subtotal
  pdf.text("Subtotal:", summaryX, yPosition);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${currency}${subtotal.toFixed(2)}`, pageWidth - 25, yPosition);

  yPosition += 6;
  pdf.setFont("helvetica", "normal");

  // Items and Size info
  pdf.text(`Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}`, summaryX, yPosition);
  pdf.text(`Size: ${totalSize}`, pageWidth - 50, yPosition);

  yPosition += 6;

  // Tax (if applicable)
  if (taxRate > 0) {
    pdf.text(`Tax (${(taxRate * 100)}%):`, summaryX, yPosition);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${currency}${tax.toFixed(2)}`, pageWidth - 25, yPosition);
    pdf.setFont("helvetica", "normal");
    yPosition += 6;
  }

  // Final total
  yPosition += 2;
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(1);
  pdf.line(summaryX, yPosition, pageWidth - 15, yPosition);

  yPosition += 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("Total Price:", summaryX, yPosition);
  pdf.setTextColor(...secondaryColor);
  pdf.text(`${currency}${finalTotal.toFixed(2)}`, pageWidth - 25, yPosition);

  // Footer
  pdf.setTextColor(150, 150, 150);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  const footerLines = pdf.splitTextToSize(footerText, pageWidth - 30);
  pdf.text(footerLines, 15, pageHeight - 10);

  // Save the PDF
  pdf.save(`${companyName}_Order_${invoiceNumber}.pdf`);

  // Also generate a text file
  generateTextFile(items, totalSize, totalPrice, invoiceNumber, config);
};

const generateTextFile = (
  items: CartItem[],
  totalSize: string,
  totalPrice: number,
  orderId: string,
  config: PDFConfig
): void => {
  const {
    companyName = "ABA PRO GAMES",
    companyEmail = "aba@abaprogames.com",
    companyPhone = "+20 121 083 8049",
    taxRate = 0,
    currency = "$",
  } = config;

  const orderDate = new Date().toLocaleDateString();
  const orderTime = new Date().toLocaleTimeString();
  const subtotal = totalPrice;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  let textContent = `${companyName} - ORDER RECEIPT\n`;
  textContent += "=" + "=".repeat(60) + "\n\n";
  textContent += `Invoice #: ${orderId}\n`;
  textContent += `Date: ${orderDate}\n`;
  textContent += `Time: ${orderTime}\n`;
  textContent += `Email: ${companyEmail}\n`;
  textContent += `Phone: ${companyPhone}\n\n`;

  textContent += "GAMES:\n";
  textContent += "-" + "-".repeat(60) + "\n";
  textContent += "Game Name                      | ID       | Size     | Qty | Price\n";
  textContent += "-" + "-".repeat(60) + "\n";

  items.forEach((item) => {
    const price = `${currency}${(item.price * item.quantity).toFixed(2)}`;
    const nameDisplay = item.title.length > 30 ? item.title.substring(0, 27) + "..." : item.title;
    textContent += `${nameDisplay.padEnd(30)} | ${item.id.padEnd(8)} | ${item.size.padEnd(8)} | ${item.quantity} | ${price}\n`;
  });

  textContent += "-" + "-".repeat(60) + "\n";
  textContent += `Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n`;
  textContent += `Total Storage: ${totalSize}\n`;
  textContent += `Subtotal: ${currency}${subtotal.toFixed(2)}\n`;

  if (taxRate > 0) {
    textContent += `Tax (${(taxRate * 100)}%): ${currency}${tax.toFixed(2)}\n`;
  }

  textContent += `\nTOTAL: ${currency}${finalTotal.toFixed(2)}\n`;
  textContent += "=" + "=".repeat(60) + "\n";
  textContent += "Thank you for your purchase!\n";

  // Create and download text file
  const element = document.createElement("a");
  element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(textContent)}`);
  element.setAttribute("download", `${companyName}_Order_${orderId}.txt`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
