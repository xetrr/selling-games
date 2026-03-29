import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const { state, removeItem, clearCart, getTotalSize, getTotalItems } = useCart();
  const [justCleared, setJustCleared] = useState(false);

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
              Start adding games to your collection!
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

  const handleClearCart = () => {
    clearCart();
    setJustCleared(true);
    setTimeout(() => setJustCleared(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Header spacing */}
      <div className="h-16" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Collection</h1>

        <div className="grid lg:grid-cols-3 gap-8 pb-20 lg:pb-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-border/50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {item.size} GB
                  </p>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-3 hover:bg-destructive/20 text-destructive rounded-lg transition-colors flex-shrink-0"
                  aria-label="Remove item"
                  title="Remove from collection"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Summary</h2>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground/70 font-medium">Total Games</span>
                  <span className="text-2xl font-bold text-primary">
                    {getTotalItems()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground/70 font-medium">Total Size</span>
                  <span className="text-2xl font-bold text-primary">
                    {getTotalSize()} GB
                  </span>
                </div>
              </div>

              {/* Info box */}
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-2 text-xs text-foreground/70">
                <p className="font-medium text-primary">ℹ️ Collection Info</p>
                <p>
                  Your collection contains {getTotalItems()} game{getTotalItems() !== 1 ? 's' : ''}.
                </p>
                <p>
                  Total storage required: <strong>{getTotalSize()} GB</strong>
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  to="/games"
                  className="block w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all text-center"
                >
                  Continue Shopping
                </Link>

                <button
                  onClick={handleClearCart}
                  className="w-full px-6 py-3 bg-destructive/20 hover:bg-destructive/30 text-destructive font-bold rounded-lg transition-all border border-destructive/50"
                >
                  Clear Collection
                </button>
              </div>

              {justCleared && (
                <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
                  ✓ Collection cleared
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
