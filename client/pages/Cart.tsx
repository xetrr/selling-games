import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { generatePDF } from "@/lib/pdf-export";

export default function Cart() {
  const { state, removeItem, updateQuantity, getTotalSize, getTotalPrice, clearCart } =
    useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await generatePDF(state.items, getTotalSize(), getTotalPrice());
      // Clear cart after successful export
      clearCart();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Header spacing */}
        <div className="h-16" />

        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <ShoppingCart className="w-16 h-16 mx-auto text-foreground/30" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Add some games to get started!
            </p>
            <Link
              to="/games"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Browse Games
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header spacing */}
      <div className="h-16" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8 pb-20 lg:pb-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-4 flex gap-4"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-border/50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{item.title}</h3>
                  <p className="text-sm text-foreground/60 mt-1">{item.size}</p>

                  {/* Price */}
                  <div className="mt-2">
                    <p className="text-sm font-medium text-secondary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-3 bg-muted rounded-lg w-fit px-2 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 hover:bg-border rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 font-bold text-sm min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-border rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors self-start"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm text-foreground/70">
                  <span>Items ({state.items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-foreground/70">
                  <span>Total Size</span>
                  <span>{getTotalSize()}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-secondary">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Generate & Export PDF"}
              </button>

              <Link
                to="/games"
                className="block w-full px-6 py-3 bg-card border border-border hover:border-primary/50 text-foreground font-bold rounded-lg transition-all text-center"
              >
                Continue Shopping
              </Link>

              <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-2 text-xs text-foreground/60">
                <p className="font-medium">Your PDF will include:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Game ID, Name & Size</li>
                  <li>Total Storage Size</li>
                  <li>Price Information</li>
                  <li>Order Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
