import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import app from "./src/app";
import { connectDatabase } from "./src/config/db";
import { initializeChatSockets } from "./src/sockets/chat.socket";

dotenv.config();

process.on("uncaughtException", (error) => {
  console.error("[uncaughtException]", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason);
});

const PORT = process.env.PORT || 8000;

async function start() {
  try {
    await connectDatabase();
    console.log("MongoDB Connected");

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    initializeChatSockets(io);

    httpServer.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("DB Connection Error:", error);
    mongoose.connection.close().catch(() => undefined);
  }
}

start();
