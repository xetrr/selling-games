import { Link } from "react-router-dom";
import GameCard from "@/components/GameCard";
import { ArrowRight, Gamepad2, HardDrive, Package, Zap } from "lucide-react";

const FEATURED_GAMES = [
  {
    id: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop",
    size: "140GB",
    downloads: 3450,
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1535889713233-33f3dda7b751?w=400&h=225&fit=crop",
    size: "150GB",
    downloads: 2750,
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    image: "https://images.unsplash.com/photo-1552861561-340531ee7757?w=400&h=225&fit=crop",
    size: "60GB",
    downloads: 3200,
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    size: "130GB",
    downloads: 2980,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header spacing */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                    ABA Pro Games
                  </span>
                </h1>
                <p className="text-lg text-foreground/70 md:text-xl">
                  Your ultimate destination for game data, hard drives, and gaming accessories. 
                  Experience gaming like never before with our premium collection.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  Browse Games
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border hover:border-primary/50 text-foreground font-bold rounded-lg transition-all"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl md:text-3xl font-black text-primary">
                    500+
                  </p>
                  <p className="text-sm text-foreground/60">Games Available</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black text-secondary">
                    10K+
                  </p>
                  <p className="text-sm text-foreground/60">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black text-primary">
                    24/7
                  </p>
                  <p className="text-sm text-foreground/60">Support</p>
                </div>
              </div>
            </div>

            {/* Hero image grid */}
            <div className="relative hidden lg:grid grid-cols-2 gap-4 h-96">
              <div className="rounded-xl overflow-hidden border border-border/50">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop"
                  alt="Featured game"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-xl overflow-hidden border border-border/50">
                  <img
                    src="https://images.unsplash.com/photo-1535889713233-33f3dda7b751?w=400&h=150&fit=crop"
                    alt="Featured game"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-border/50">
                  <img
                    src="https://images.unsplash.com/photo-1552861561-340531ee7757?w=400&h=150&fit=crop"
                    alt="Featured game"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Huge Game Library</h3>
              <p className="text-sm text-foreground/60">
                Access over 500 games from all genres and eras
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold">Storage Solutions</h3>
              <p className="text-sm text-foreground/60">
                Premium hard drives optimized for gaming
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Accessories</h3>
              <p className="text-sm text-foreground/60">
                Everything you need for the ultimate gaming setup
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold">Fast & Reliable</h3>
              <p className="text-sm text-foreground/60">
                Quick shipping and excellent customer support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Games</h2>
            <Link
              to="/games"
              className="text-primary hover:text-primary/80 font-bold flex items-center gap-2 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 pb-20 md:pb-8">
            {FEATURED_GAMES.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                size={game.size}
                downloads={game.downloads}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/20 to-secondary/20 border-y border-border">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Level Up Your Gaming?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join thousands of gamers who trust ABA Pro Games for their gaming needs
          </p>
          <Link
            to="/games"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
