import { Plus, X, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface GameCardProps {
  id: string;
  name: string;
  image: string;
  size: number; // in GB
  onPreview?: (name: string) => void;
}

export default function GameCard({ id, name, image, size, onPreview }: GameCardProps) {
  const { isInCart, addItem, removeItem } = useCart();
  const [isInCartState, setIsInCartState] = useState(isInCart(id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({ id, name, size, image });
    setIsInCartState(true);
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    removeItem(id);
    setIsInCartState(false);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview?.(name);
  };

  return (
    <div className="block group">
      <div className="relative overflow-hidden flex flex-col h-full transition-all duration-300 bg-card border border-border rounded-xl hover:border-primary/50">
        {/* Gradient line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary via-secondary to-transparent" />

        {/* Image container */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

          {/* Size badge - top left (LARGE) */}
          <div className="absolute top-3 left-3 px-3 py-2 rounded-lg bg-primary/90 border border-primary/50 backdrop-blur-sm">
            <div className="text-lg font-black text-primary-foreground">
              {size}
            </div>
            <div className="text-[10px] font-bold text-primary-foreground/80">
              GB
            </div>
          </div>

          {/* Preview button - top right (show on hover on larger screens) */}
          <button
            onClick={handlePreview}
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-lg bg-primary/80 border border-primary hover:bg-primary transition-all flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Preview"
            title="View details"
          >
            <Eye className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Content section */}
        <div className="px-4 py-3 flex flex-col gap-3 border-t border-border flex-grow">
          {/* Game title */}
          <h3 className="text-sm font-bold text-white line-clamp-2">
            {name}
          </h3>

          {/* Action button */}
          <button
            onClick={isInCartState ? handleRemoveFromCart : handleAddToCart}
            className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all text-white font-bold uppercase tracking-wide flex items-center justify-center gap-2 text-sm ${
              isInCartState
                ? "bg-red-500/20 border-red-500 hover:bg-red-500/30"
                : "bg-primary/20 border-primary hover:bg-primary/30"
            }`}
          >
            {isInCartState ? (
              <>
                <X className="w-4 h-4" />
                Remove
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
