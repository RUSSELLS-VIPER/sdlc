import express from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import fs from "fs";
import path from "path";
import dns from "dns";
import swaggerUi from "swagger-ui-express";
import multer from "multer";
import type { NextFunction, Request, Response } from "express";

import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import clientRoutes from "./routes/client.routes";
import agentRoutes from "./routes/agent.routes";
import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/db";

function resolveExistingPath(candidates: string[]) {
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function getExternalOrigin(req: Request) {
  const forwardedProto = String(req.headers["x-forwarded-proto"] ?? "").split(",")[0].trim();
  const proto = forwardedProto || (req.secure ? "https" : req.protocol);
  return `${proto}://${req.get("host")}`;
}

if (process.env.DNS_SERVERS) {
  dns.setServers(
    process.env.DNS_SERVERS.split(",")
      .map((server) => server.trim())
      .filter(Boolean)
  );
}

const app = express();
const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
  allowedHeaders: [
    "Authorization",
    "Content-Type",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Date",
    "X-Api-Version",
    "X-CSRF-Token",
    "X-Requested-With"
  ],
  maxAge: 86400
};
const viewsDir = resolveExistingPath([
  path.join(process.cwd(), "src", "views"),
  path.join(process.cwd(), "api", "src", "views"),
  path.join(__dirname, "views"),
  path.join(__dirname, "..", "src", "views"),
  path.join(__dirname, "..", "api", "src", "views")
]);
const assetsDir = resolveExistingPath([
  path.join(process.cwd(), "public", "assets"),
  path.join(process.cwd(), "api", "public", "assets"),
  path.join(__dirname, "..", "public", "assets"),
  path.join(__dirname, "..", "api", "public", "assets")
]);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(assetsDir));

app.set("view engine", "ejs");
app.set("views", viewsDir);

app.use(async (req, _res, next) => {
  if (req.path.startsWith("/api")) {
    try {
      await connectDatabase();
    } catch (error) {
      next(error);
      return;
    }
  }

  next();
});

app.get("/", (req, res) => {
  res.render("api-tester", {
    baseUrl: getExternalOrigin(req)
  });
});

app.get("/tester", (req, res) => {
  res.render("api-tester2", {
    baseUrl: getExternalOrigin(req)
  });
});

app.get("/api-docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

app.get("/api", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/agent", agentRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Image too large. Max allowed size is 5MB." });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }

  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error" });
});

export default app;
