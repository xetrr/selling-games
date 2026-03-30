// RAWG API Service for game details, screenshots, videos, ratings
// API Key: bd0c1f222321485aac94e1d7e261c5a9

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_BASE = "https://api.rawg.io/api";

export interface GameDetails {
  id: number;
  name: string;
  description: string;
  rating: number;
  rating_top: number;
  metacritic: number | null;
  genres: Array<{ name: string }>;
  platforms: Array<{ platform: { name: string } }>;
  released: string;
  developers: Array<{ name: string }>;
  publishers: Array<{ name: string }>;
}

export interface GameScreenshot {
  id: number;
  image: string;
}

export interface GameVideo {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
}

// Search for game details
export const searchGameDetails = async (query: string): Promise<GameDetails | null> => {
  try {
    const response = await fetch(
      `${API_BASE}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=1`
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    return data.results[0];
  } catch (error) {
    console.error("Error searching game details:", error);
    return null;
  }
};

// Get game by ID
export const getGameDetails = async (id: number): Promise<GameDetails | null> => {
  try {
    const response = await fetch(`${API_BASE}/games/${id}?key=${API_KEY}`);

    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

// Get game screenshots
export const getGameScreenshots = async (id: number): Promise<GameScreenshot[]> => {
  try {
    const response = await fetch(`${API_BASE}/games/${id}/screenshots?key=${API_KEY}`);

    if (!response.ok) return [];

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching screenshots:", error);
    return [];
  }
};

// Get game videos
export const getGameVideos = async (id: number): Promise<GameVideo[]> => {
  try {
    const response = await fetch(`${API_BASE}/games/${id}/movies?key=${API_KEY}`);

    if (!response.ok) return [];

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

// Get full game details with screenshots and videos
export const getFullGameDetails = async (id: number) => {
  try {
    const [details, screenshots, videos] = await Promise.all([
      getGameDetails(id),
      getGameScreenshots(id),
      getGameVideos(id),
    ]);

    return { details, screenshots, videos };
  } catch (error) {
    console.error("Error fetching full game details:", error);
    return { details: null, screenshots: [], videos: [] };
  }
};
