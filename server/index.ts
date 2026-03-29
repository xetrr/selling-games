import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  searchGames,
  getGameById,
  getPopularGames,
  getGameImages,
} from "./routes/games-api";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Games API routes (proxy to SteamGridDB)
  // NOTE: More specific routes must come before parameterized routes
  app.get("/api/games/search", searchGames);
  app.get("/api/games/popular", getPopularGames);
  app.get("/api/games/:gameId/images", getGameImages);
  app.get("/api/games/:steamId", getGameById);

  return app;
}
