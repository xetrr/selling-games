import { useState, useEffect } from "react";
import { fetchGames, addGame, updateGame, deleteGame } from "@/services/supabase";
import { Trash2, Plus, X, Edit2, Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface Game {
  id: string;
  name: string;
  image: string;
  size: number;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    size: "",
  });

  // Load games on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadGames();
    }
  }, [isAuthenticated]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await fetchGames();
      setGames(data);
    } catch (err) {
      setError("Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPassword("");
      setSuccess("Authenticated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError("Incorrect password");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.size) {
      setError("All fields are required");
      return;
    }

    try {
      const sizeNum = parseFloat(formData.size);
      if (isNaN(sizeNum) || sizeNum <= 0) {
        setError("Size must be a positive number");
        return;
      }

      if (editingId) {
        // Update existing game
        const updated = await updateGame(editingId, {
          name: formData.name,
          image: formData.image,
          size: sizeNum,
        });
        if (updated) {
          setSuccess("Game updated successfully!");
          setGames(games.map((g) => (g.id === editingId ? updated : g)));
        }
      } else {
        // Add new game
        const newGame = await addGame({
          name: formData.name,
          image: formData.image,
          size: sizeNum,
        });
        if (newGame) {
          setSuccess("Game added successfully!");
          setGames([newGame, ...games]);
        }
      }

      setFormData({ name: "", image: "", size: "" });
      setShowForm(false);
      setEditingId(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to save game");
    }
  };

  const handleEdit = (game: Game) => {
    setFormData({
      name: game.name,
      image: game.image,
      size: game.size.toString(),
    });
    setEditingId(game.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      const success = await deleteGame(id);
      if (success) {
        setGames(games.filter((g) => g.id !== id));
        setSuccess("Game deleted successfully!");
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError("Failed to delete game");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", image: "", size: "" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-16" />
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center text-foreground">
                Admin Access
              </h1>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all"
                >
                  Login
                </button>
              </form>

              {error && (
                <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="text-center">
                <Link to="/" className="text-primary hover:underline text-sm">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="h-16" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive font-bold rounded-lg transition-all border border-destructive/50"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            ✓ {success}
          </div>
        )}

        <div className="mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Game
            </button>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {editingId ? "Edit Game" : "Add New Game"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Game Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., The Witcher 3"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Size (GB)
                  </label>
                  <input
                    type="number"
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                    placeholder="e.g., 140"
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all"
                  >
                    {editingId ? "Update" : "Add"} Game
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-foreground/60">Loading games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">No games yet. Add your first game!</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                      Game Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                      Size (GB)
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground">{game.name}</td>
                      <td className="px-6 py-4 text-foreground">{game.size} GB</td>
                      <td className="px-6 py-4">
                        <a
                          href={game.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          View
                        </a>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(game)}
                          className="p-2 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                          title="Edit game"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(game.id)}
                          className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                          title="Delete game"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
