import { MessageCircle, Plus, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  size: string;
  downloads: number;
  price: number;
}

export default function GameCard({ id, title, image, size, downloads, price }: GameCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, title, size, price, image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }
  return (
    <Link
      to={`/game/${id}`}
      className="block group"
    >
      <div className="relative overflow-hidden flex flex-col h-full transition-all duration-300 bg-card border border-border rounded-xl hover:border-primary/50">
        {/* Gradient line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary via-secondary to-transparent" />

        {/* Image container */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

          {/* Size badge - top left */}
          <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md text-[10px] font-black tracking-wide bg-black/75 border border-primary/35 text-secondary">
            {size}
          </div>

          {/* Download count badge - bottom left */}
          <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-md text-[10px] font-medium bg-black/65 border border-white/8 text-foreground/60 flex items-center gap-1">
            <Download className="w-2.5 h-2.5" />
            {downloads}
          </div>

          {/* Preview button - top right (show on hover on larger screens) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-lg bg-black/70 border border-white/12 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 hover:border-white/20"
            aria-label="Preview"
          >
            <Eye className="w-3.5 h-3.5 text-foreground" />
          </button>
        </div>

        {/* Content section */}
        <div className="px-3 py-2.5 flex flex-col gap-2 border-t border-border flex-grow">
          {/* Game title */}
          <h3 className="text-xs font-bold text-white truncate" dir="ltr">
            {title}
          </h3>

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* WhatsApp button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-9 h-9 rounded-lg bg-green-500/15 border border-green-500/45 flex items-center justify-center hover:bg-green-500/25 transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
            </button>

            {/* Price and Add button */}
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-xs font-bold text-secondary text-center">
                ${price.toFixed(2)}
              </div>
              <button
                onClick={handleAddToCart}
                className={`px-3 py-2 rounded-lg border transition-all text-white text-[11px] font-black uppercase tracking-wide flex items-center justify-center gap-1 ${
                  justAdded
                    ? "bg-green-500/80 border-green-500 text-white"
                    : "bg-primary border-primary/80 hover:bg-primary/90"
                }`}
              >
                <Plus className="w-3 h-3" />
                {justAdded ? "Added!" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
