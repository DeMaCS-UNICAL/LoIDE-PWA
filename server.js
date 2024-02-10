const helmet = require("helmet");
const express = require("express");
const https = require("https");
const http = require("http");
const compression = require("compression");
const path = require("path");
const fs = require("fs");

const forceSSL = require("express-force-ssl");

const pckg = require("./package.json");

const rateLimit = require("express-rate-limit");
// System config loading
const properties = require("./config/server/server-config.json");
const httpPort = properties.port.http;
const httpsPortP = properties.port.https;
const key = properties.path.key;
const cert = properties.path.cert;
const maxAge = properties.max_age;
const windowMs = properties.rate_limit.windowMs;
const max = properties.rate_limit.max;

const app = express();

const server = http.createServer(app);
var enableHTTPS = false;

if (key.length !== 0 && cert.length !== 0) {
  enableHTTPS = true;

  let options = {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
  };

  // Enable redirect from HTTP to HTTPS
  app.use(forceSSL);
  app.set("forceSSLOptions", {
    httpsPort: httpsPortP,
  });

  var secureServer = https.createServer(options, app);
}

app.use(
  helmet({
    hsts: {
      maxAge: maxAge,
    },
    contentSecurityPolicy: false,
  }),
);

app.use(compression());

app.use(
  rateLimit({
    windowMs: windowMs,
    max: max,
  }),
);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (enableHTTPS) {
  secureServer.listen(httpsPortP, function () {
    print_log("LoIDE-PWA listening on secure port " + httpsPortP);
    print_log("Version: " + pckg.version);
  });
}

server.listen(httpPort, function () {
  print_log("LoIDE-PWA listening on port " + httpPort);
  print_log("Version: " + pckg.version);
});

function print_log(statement) {
  console.log("%s: %s", new Date().toLocaleString(), statement);
}
