import GameCard from "@/components/GameCard";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getPopularGames } from "@/services/steamgriddb";

const SAMPLE_GAMES = [
  {
    id: "resident-evil-2",
    title: "Resident Evil 2",
    image: "https://images.unsplash.com/photo-1578979881614-f4fb84857d11?w=400&h=225&fit=crop",
    size: "45GB",
    downloads: 1250,
    price: 4.99,
  },
  {
    id: "resident-evil-3",
    title: "Resident Evil 3",
    image: "https://images.unsplash.com/photo-1585647347384-c0eb908cb4d8?w=400&h=225&fit=crop",
    size: "48GB",
    downloads: 1180,
    price: 4.99,
  },
  {
    id: "resident-evil-4",
    title: "Resident Evil 4 Remake",
    image: "https://images.unsplash.com/photo-1534531173927-c81fca934829?w=400&h=225&fit=crop",
    size: "52GB",
    downloads: 2340,
    price: 5.99,
  },
  {
    id: "resident-evil-village",
    title: "Resident Evil Village",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=225&fit=crop",
    size: "50GB",
    downloads: 2100,
    price: 5.99,
  },
  {
    id: "alan-wake-2",
    title: "Alan Wake 2",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=225&fit=crop",
    size: "90GB",
    downloads: 1890,
    price: 6.99,
  },
  {
    id: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop",
    size: "140GB",
    downloads: 3450,
    price: 7.99,
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    size: "130GB",
    downloads: 2980,
    price: 7.99,
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    image: "https://images.unsplash.com/photo-1552861561-340531ee7757?w=400&h=225&fit=crop",
    size: "60GB",
    downloads: 3200,
    price: 5.99,
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1535889713233-33f3dda7b751?w=400&h=225&fit=crop",
    size: "150GB",
    downloads: 2750,
    price: 8.99,
  },
  {
    id: "starfield",
    title: "Starfield",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=400&h=225&fit=crop",
    size: "125GB",
    downloads: 2600,
    price: 7.99,
  },
  {
    id: "final-fantasy-16",
    title: "Final Fantasy XVI",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd8f2c5c?w=400&h=225&fit=crop",
    size: "140GB",
    downloads: 1950,
    price: 7.99,
  },
  {
    id: "tekken-8",
    title: "TEKKEN 8",
    image: "https://images.unsplash.com/photo-1577720643272-265a55e20cbb?w=400&h=225&fit=crop",
    size: "160GB",
    downloads: 1340,
    price: 6.99,
  },
];

export default function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [games, setGames] = useState(SAMPLE_GAMES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        // Try to fetch from SteamGridDB API
        const apiGames = await getPopularGames();

        // Use API games if available, otherwise use sample games
        if (apiGames.length > 0) {
          setGames(apiGames);
        } else {
          setGames(SAMPLE_GAMES);
        }
      } catch (err) {
        console.error("Error loading games:", err);
        setError("Failed to load games. Showing sample games.");
        setGames(SAMPLE_GAMES);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header spacing */}
      <div className="h-16" />

      <div className="container mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="mb-8 text-3xl font-bold text-foreground">Game Data</h1>

        {/* Search bar */}
        <div className="mb-8 flex flex-col lg:flex-row gap-6">
          {/* Search input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Filter button (mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors font-medium text-sm"
          >
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary mb-3">Storage</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    Under 50GB
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    50GB - 100GB
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    100GB - 150GB
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    Over 150GB
                  </label>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h3 className="text-sm font-bold text-primary mb-3">Genre</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    Action
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    RPG
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    Fighting
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer hover:text-foreground transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    Adventure
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Games grid */}
          <div className="flex-1 pb-20 lg:pb-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                  <p className="text-foreground/60">Loading games...</p>
                </div>
              </div>
            ) : error && filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg mb-4">{error}</p>
                <p className="text-foreground/40">Showing sample games instead</p>
              </div>
            ) : filteredGames.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    image={game.image}
                    size={game.size}
                    downloads={game.downloads}
                    price={game.price}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">
                  No games found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
