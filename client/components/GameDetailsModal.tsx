import { X, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getFullGameDetails } from "@/services/rawg";

interface GameDetailsModalProps {
  gameName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameDetailsModal({
  gameName,
  isOpen,
  onClose,
}: GameDetailsModalProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  useEffect(() => {
    if (isOpen && gameName) {
      loadGameDetails();
    }
  }, [isOpen, gameName]);

  const loadGameDetails = async () => {
    try {
      setLoading(true);

      // First, search for the game to get its ID
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${encodeURIComponent(
          gameName
        )}&page_size=1`
      );

      if (!response.ok) throw new Error("Failed to search game");

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error("Game not found");
      }

      const game = data.results[0];
      const { details: fullDetails, screenshots: screensList, videos: videosList } =
        await getFullGameDetails(game.id);

      setDetails(fullDetails);
      setScreenshots(screensList);
      setVideos(videosList);
    } catch (error) {
      console.error("Error loading game details:", error);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground truncate">
            {gameName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-foreground/60">Loading game details...</p>
              </div>
            </div>
          ) : details ? (
            <>
              {/* Rating and Info */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  {details.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-lg">
                        <Star className="w-5 h-5 text-primary fill-primary" />
                        <span className="text-lg font-bold text-primary">
                          {details.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-foreground/60">/ 5</span>
                      </div>
                    </div>
                  )}

                  {details.released && (
                    <div>
                      <p className="text-sm text-foreground/60">Release Date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(details.released).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {details.genres && details.genres.length > 0 && (
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">Genres</p>
                      <div className="flex flex-wrap gap-2">
                        {details.genres.map((genre: any) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-foreground"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {details.description && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">About</h3>
                  <p
                    className="text-foreground/70 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: details.description.substring(0, 500) + "...",
                    }}
                  />
                </div>
              )}

              {/* Screenshots */}
              {screenshots.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Screenshots
                  </h3>
                  <div className="space-y-3">
                    {/* Main screenshot */}
                    <div className="rounded-lg overflow-hidden border border-border">
                      <img
                        src={screenshots[selectedScreenshot].image}
                        alt={`Screenshot ${selectedScreenshot + 1}`}
                        className="w-full h-auto object-cover max-h-96"
                      />
                    </div>

                    {/* Thumbnail strip */}
                    {screenshots.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {screenshots.slice(0, 5).map((screenshot, index) => (
                          <button
                            key={screenshot.id}
                            onClick={() => setSelectedScreenshot(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              selectedScreenshot === index
                                ? "border-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <img
                              src={screenshot.image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Video */}
              {videos.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Gameplay Video
                  </h3>
                  <div className="rounded-lg overflow-hidden border border-border aspect-video">
                    <video
                      src={videos[0].data.max}
                      controls
                      className="w-full h-full"
                      poster={videos[0].preview}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Developers */}
              {details.developers && details.developers.length > 0 && (
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Developers</p>
                  <p className="text-foreground">
                    {details.developers.map((dev: any) => dev.name).join(", ")}
                  </p>
                </div>
              )}

              {/* Publishers */}
              {details.publishers && details.publishers.length > 0 && (
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Publishers</p>
                  <p className="text-foreground">
                    {details.publishers.map((pub: any) => pub.name).join(", ")}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">
                Unable to load game details. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
