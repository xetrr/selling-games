import GameCard from "@/components/GameCard";
import GameDetailsModal from "@/components/GameDetailsModal";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchGames } from "@/services/supabase";

export default function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchGames();
        setGames(data);

        if (data.length === 0) {
          setError("📝 No games in database. Use the Admin Panel at /admin to add your first game!");
        }
      } catch (err) {
        console.error("Error loading games:", err);
        setError("⚠️ Failed to load games. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header spacing */}
      <div className="h-16" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Game Collection</h1>

        {/* Search bar */}
        <div className="mb-8">
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

        {/* Games grid */}
        <div className="pb-20 lg:pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-foreground/60">Loading games...</p>
              </div>
            </div>
          ) : error && games.length === 0 ? (
            <div className="text-center py-20 max-w-2xl mx-auto">
              <p className="text-foreground/60 text-lg mb-6">{error}</p>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 space-y-4 text-left">
                <h3 className="font-bold text-primary text-lg">Setup Instructions:</h3>
                {error.includes("No games") && (
                  <div className="space-y-2">
                    <p className="text-foreground/80">1. Visit the <strong className="text-primary">/admin</strong> page</p>
                    <p className="text-foreground/80">2. Login with password: <strong className="text-primary">#Mm01068283805</strong></p>
                    <p className="text-foreground/80">3. Add games with name, image URL, and size (GB)</p>
                  </div>
                )}
                {error.includes("Supabase") && (
                  <div className="space-y-2">
                    <p className="text-foreground/80"><strong>Issue:</strong> Supabase API key is invalid or table doesn't exist</p>
                    <p className="text-foreground/80 mt-3"><strong>Fix:</strong></p>
                    <ol className="text-sm text-foreground/70 space-y-1 list-decimal list-inside ml-2">
                      <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com</a></li>
                      <li>Create table "games" with: id (uuid), name (text), image (text), size (numeric)</li>
                      <li>Copy your API URL and Anon Key</li>
                      <li>Update .env file with your credentials</li>
                      <li>Restart dev server or redeploy</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  size={game.size}
                  onPreview={(name) => {
                    setSelectedGame(name);
                    setIsModalOpen(true);
                  }}
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

      {/* Game Details Modal */}
      <GameDetailsModal
        gameName={selectedGame || ""}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGame(null);
        }}
      />
    </div>
  );
}
