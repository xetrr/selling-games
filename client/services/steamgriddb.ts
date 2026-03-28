// SteamGridDB API Service
// Documentation: https://www.steamgriddb.com/api/v2

const API_BASE = "https://www.steamgriddb.com/api/v2";

export interface SteamGame {
  id: string;
  title: string;
  size: string;
  downloads: number;
  price: number;
  image: string;
  steamId?: number;
  releaseDate?: string;
  developers?: string[];
}

// Search for a game by name
export const searchGameBySteamID = async (gameId: number): Promise<SteamGame | null> => {
  try {
    const response = await fetch(`${API_BASE}/games/id/${gameId}`);
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.data) return null;

    const game = data.data;

    // Get game header image
    const imageResponse = await fetch(
      `${API_BASE}/search/autocomplete/${encodeURIComponent(game.name)}`
    );
    const imageData = await imageResponse.json();
    let imageUrl = "https://via.placeholder.com/400x225?text=" + encodeURIComponent(game.name);

    if (imageData.data && imageData.data.length > 0) {
      const firstResult = imageData.data[0];
      imageUrl = firstResult.logo || imageUrl;
    }

    return {
      id: game.id.toString(),
      title: game.name,
      size: "60GB", // You can customize this
      downloads: Math.floor(Math.random() * 5000), // Placeholder
      price: parseFloat((Math.random() * 8 + 2).toFixed(2)), // Random between $2-$10
      image: imageUrl,
      steamId: game.id,
      releaseDate: game.release_date,
      developers: game.developers || [],
    };
  } catch (error) {
    console.error("Error fetching game from SteamGridDB:", error);
    return null;
  }
};

// Search for games by name
export const searchGamesByName = async (query: string): Promise<SteamGame[]> => {
  try {
    const response = await fetch(`${API_BASE}/search/autocomplete/${encodeURIComponent(query)}`);
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.data) return [];

    // Get grid images for search results
    const games: SteamGame[] = [];

    for (const result of data.data.slice(0, 10)) {
      // Get grid/hero image
      const gridResponse = await fetch(`${API_BASE}/grids/game/${result.id}`);
      let imageUrl = "https://via.placeholder.com/400x225?text=" + encodeURIComponent(result.name);

      if (gridResponse.ok) {
        const gridData = await gridResponse.json();
        if (gridData.data && gridData.data.length > 0) {
          // Use the first available grid image
          imageUrl = gridData.data[0].thumb;
        }
      }

      games.push({
        id: result.id.toString(),
        title: result.name,
        size: "60GB",
        downloads: Math.floor(Math.random() * 5000),
        price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
        image: imageUrl,
        steamId: result.id,
        releaseDate: result.release_date,
      });
    }

    return games;
  } catch (error) {
    console.error("Error searching games:", error);
    return [];
  }
};

// Get popular games from Steam
export const getPopularGames = async (): Promise<SteamGame[]> => {
  // Sample Steam game IDs (popular games)
  const popularSteamIds = [
    730,      // CS:GO
    570,      // Dota 2
    440,      // Team Fortress 2
    271590,   // GTA V
    202990,   // The Witcher 3
    8980,     // Borderlands 2
    304930,   // Unreal Tournament
    221100,   // DayZ
    108600,   // Project Zomboid
    34490,    // Half-Life 2
  ];

  const games: SteamGame[] = [];

  for (const steamId of popularSteamIds) {
    const game = await searchGameBySteamID(steamId);
    if (game) {
      games.push(game);
    }
  }

  return games;
};

// Get game images from SteamGridDB
export const getGameImages = async (gameId: number) => {
  try {
    const [grids, heroes, logos] = await Promise.all([
      fetch(`${API_BASE}/grids/game/${gameId}`).then(r => r.json()).catch(() => ({ data: [] })),
      fetch(`${API_BASE}/heroes/game/${gameId}`).then(r => r.json()).catch(() => ({ data: [] })),
      fetch(`${API_BASE}/logos/game/${gameId}`).then(r => r.json()).catch(() => ({ data: [] })),
    ]);

    return {
      grids: grids.data || [],
      heroes: heroes.data || [],
      logos: logos.data || [],
    };
  } catch (error) {
    console.error("Error fetching game images:", error);
    return { grids: [], heroes: [], logos: [] };
  }
};
