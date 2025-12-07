import helmet from "helmet";
import express from "express";
import https from "node:https";
import http from "node:http";
import compression from "compression";
import path from "node:path";
import fs from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
import forceSSL from "express-force-ssl";
import rateLimit from "express-rate-limit";
import Ajv from "ajv";
import jsonPointer from "json-pointer";

// ES Module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON files using fs (ES Modules don't support require for JSON)
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));
const serverConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config/server/server-config.json"), "utf-8"),
);
const serverConfigSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config/server/server-config-schema.json"), "utf-8"),
);

// ─── Configuration ───────────────────────────────────────────────────────────
const config = {
  httpPort: process.env.PORT ?? serverConfig.port.http,
  httpsPort: serverConfig.port.https,
  keyPath: serverConfig.path.key,
  certPath: serverConfig.path.cert,
  hstsMaxAge: serverConfig.max_age,
  rateLimit: {
    windowMs: serverConfig.rate_limit.windowMs,
    max: serverConfig.rate_limit.max,
  },
  apiServer: process.env.LOIDE_API_SERVER?.trim(),
};

// ─── Schema Validation ───────────────────────────────────────────────────────
validateJsonSchemas();

// ─── Express App ─────────────────────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

const enableHTTPS = Boolean(config.keyPath && config.certPath);
log(`HTTPS Enabled: ${enableHTTPS}`);

let httpsServer;

if (enableHTTPS) {
  const options = {
    key: fs.readFileSync(config.keyPath),
    cert: fs.readFileSync(config.certPath),
  };
  app.use(forceSSL);
  app.set("forceSSLOptions", { httpsPort: config.httpsPort });
  httpsServer = https.createServer(options, app);
}

// ─── Middleware ──────────────────────────────────────────────────────────────
const connectSources = buildConnectSources(config.apiServer);

app.use(
  helmet({
    hsts: enableHTTPS ? { maxAge: config.hstsMaxAge } : false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: connectSources,
      },
    },
  }),
);

app.use(compression());
app.use(rateLimit(config.rateLimit));
app.use(express.static(path.join(__dirname, "build")));

// SPA fallback route (Express 5 requires named wildcard parameter)
app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ─── Server Start ────────────────────────────────────────────────────────────
httpServer.listen(config.httpPort, () => {
  log(`LoIDE-PWA listening on port ${config.httpPort}`);
  log(`Version: ${pkg.version}`);
});

if (httpsServer) {
  httpsServer.listen(config.httpsPort, () => {
    log(`LoIDE-PWA listening on secure port ${config.httpsPort}`);
    log(`Version: ${pkg.version}`);
  });
}

// ─── Graceful Shutdown ───────────────────────────────────────────────────────
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

function gracefulShutdown(signal) {
  log(`Received ${signal}, shutting down gracefully...`);
  httpServer.close(() => log("HTTP server closed"));
  httpsServer?.close(() => log("HTTPS server closed"));
  process.exit(0);
}

// ─── Helper Functions ────────────────────────────────────────────────────────
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

function buildConnectSources(apiServer) {
  const sources = ["'self'", "https://is.gd"];
  if (apiServer) {
    sources.push(apiServer);
    const wsHost = apiServer.replace(/^(https?|wss?|http?|ws?):\/\//, "");
    sources.push("ws://" + wsHost, "wss://" + wsHost);
  }
  log(`Connect Sources: ${sources.join(", ")}`);
  return sources;
}

function validateJsonSchemas() {
  const result = validateSchema(serverConfig, serverConfigSchema, "server-config.json");
  if (result.criticalError) {
    console.error("Fatal: configuration files are invalid!");
    process.exit(1);
  }
}

function validateSchema(json, schema, name) {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const response = { criticalError: false };

  if (!validate(json)) {
    console.error("Validation errors:", validate.errors);
    for (const error of validate.errors ?? []) {
      const dataPath = error.instancePath || error.dataPath || "";
      if (!dataPath) {
        console.error(`Fatal: ${name} has root-level error`);
        response.criticalError = true;
      } else {
        jsonPointer.remove(json, dataPath);
      }
    }
  } else {
    log(`Validated: ${name}`);
  }
  return response;
}
