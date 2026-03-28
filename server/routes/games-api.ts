import { RequestHandler } from "express";

const API_BASE = "https://www.steamgriddb.com/api/v2";

// Proxy for searching games by name
export const searchGames: RequestHandler = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query parameter required" });
    }

    const response = await fetch(
      `${API_BASE}/search/autocomplete/${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "SteamGridDB API error" });
    }

    const data = await response.json();

    // Get grid images for search results
    const games = [];

    for (const result of (data.data || []).slice(0, 10)) {
      try {
        // Get grid image
        const gridResponse = await fetch(`${API_BASE}/grids/game/${result.id}`);
        let imageUrl = `https://via.placeholder.com/400x225?text=${encodeURIComponent(result.name)}`;

        if (gridResponse.ok) {
          const gridData = await gridResponse.json();
          if (gridData.data && gridData.data.length > 0) {
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
      } catch (error) {
        console.error(`Error fetching game ${result.id}:`, error);
      }
    }

    res.json({ data: games });
  } catch (error) {
    console.error("Error in searchGames:", error);
    res.status(500).json({ error: "Failed to search games" });
  }
};

// Proxy for getting game by Steam ID
export const getGameById: RequestHandler = async (req, res) => {
  try {
    const { steamId } = req.params;

    const response = await fetch(`${API_BASE}/games/id/${steamId}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Game not found" });
    }

    const data = await response.json();

    if (!data.data) {
      return res.status(404).json({ error: "Game not found" });
    }

    const game = data.data;

    // Get grid image
    let imageUrl = `https://via.placeholder.com/400x225?text=${encodeURIComponent(game.name)}`;

    try {
      const gridResponse = await fetch(`${API_BASE}/grids/game/${game.id}`);
      if (gridResponse.ok) {
        const gridData = await gridResponse.json();
        if (gridData.data && gridData.data.length > 0) {
          imageUrl = gridData.data[0].thumb;
        }
      }
    } catch (error) {
      console.error("Error fetching grid image:", error);
    }

    res.json({
      data: {
        id: game.id.toString(),
        title: game.name,
        size: "60GB",
        downloads: Math.floor(Math.random() * 5000),
        price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
        image: imageUrl,
        steamId: game.id,
        releaseDate: game.release_date,
        developers: game.developers || [],
      },
    });
  } catch (error) {
    console.error("Error in getGameById:", error);
    res.status(500).json({ error: "Failed to fetch game" });
  }
};

// Get popular games (hardcoded Steam IDs)
export const getPopularGames: RequestHandler = async (req, res) => {
  try {
    // Popular Steam game IDs
    const popularSteamIds = [
      730,      // CS:GO
      570,      // Dota 2
      271590,   // GTA V
      202990,   // The Witcher 3
      8980,     // Borderlands 2
      221100,   // DayZ
      108600,   // Project Zomboid
      1817070,  // Baldur's Gate 3
      1086940,  // Sekiro: Shadows Die Twice
      1172380,  // Elden Ring
    ];

    const games = [];

    for (const steamId of popularSteamIds) {
      try {
        const gameResponse = await fetch(`${API_BASE}/games/id/${steamId}`);

        if (!gameResponse.ok) continue;

        const gameData = await gameResponse.json();
        if (!gameData.data) continue;

        const game = gameData.data;

        // Get grid image
        let imageUrl = `https://via.placeholder.com/400x225?text=${encodeURIComponent(game.name)}`;

        try {
          const gridResponse = await fetch(`${API_BASE}/grids/game/${game.id}`);
          if (gridResponse.ok) {
            const gridData = await gridResponse.json();
            if (gridData.data && gridData.data.length > 0) {
              imageUrl = gridData.data[0].thumb;
            }
          }
        } catch (error) {
          console.error("Error fetching grid image:", error);
        }

        games.push({
          id: game.id.toString(),
          title: game.name,
          size: "60GB",
          downloads: Math.floor(Math.random() * 5000),
          price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
          image: imageUrl,
          steamId: game.id,
          releaseDate: game.release_date,
          developers: game.developers || [],
        });
      } catch (error) {
        console.error(`Error fetching game ${steamId}:`, error);
      }
    }

    res.json({ data: games });
  } catch (error) {
    console.error("Error in getPopularGames:", error);
    res.status(500).json({ error: "Failed to fetch popular games" });
  }
};

// Get game images
export const getGameImages: RequestHandler = async (req, res) => {
  try {
    const { gameId } = req.params;

    const [gridsResponse, heroesResponse, logosResponse] = await Promise.all([
      fetch(`${API_BASE}/grids/game/${gameId}`).catch(() => null),
      fetch(`${API_BASE}/heroes/game/${gameId}`).catch(() => null),
      fetch(`${API_BASE}/logos/game/${gameId}`).catch(() => null),
    ]);

    let grids = [];
    let heroes = [];
    let logos = [];

    if (gridsResponse?.ok) {
      const data = await gridsResponse.json();
      grids = data.data || [];
    }

    if (heroesResponse?.ok) {
      const data = await heroesResponse.json();
      heroes = data.data || [];
    }

    if (logosResponse?.ok) {
      const data = await logosResponse.json();
      logos = data.data || [];
    }

    res.json({ data: { grids, heroes, logos } });
  } catch (error) {
    console.error("Error in getGameImages:", error);
    res.status(500).json({ error: "Failed to fetch game images" });
  }
};
