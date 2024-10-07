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
const APIUrl = process.env.REACT_APP_LOIDE_API_SERVER
  ? "http://".concat(process.env.REACT_APP_LOIDE_API_SERVER)
  : "http://localhost:8084";

const secureAPIUrl = APIUrl.replace("http", "https");
  
// This function validates the JSON schemas
var jpointer = require("json-pointer");
var Ajv = require("ajv");
validateJsonSchemas();

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
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", APIUrl, secureAPIUrl, "https://is.gd"],
      },
    },
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

function validateJsonSchemas() {
  // Validate JSON file with the relative scheme
  var servicesValidation = validateSchema(
    "./config/server/server-config.json",
    "./config/server/server-config-schema.json",
  );

  if (servicesValidation.criticalError) {
    console.log("Fatal error: configuration files are not setted up properly!");
    process.exit(1);
  }
}

function validateSchema(jsonPath, schemaPath) {
  // Loading files
  var json = require(jsonPath);
  var schema = require(schemaPath);

  // Config
  var ajv = new Ajv({
    allErrors: true,
  });

  // Compiling the schema
  var compiledSchema = ajv.compile(schema);
  var validated = false;
  var printError = true;
  var response = {};

  while (!validated) {
    // Validating
    var validatedJson = compiledSchema(json);
    // If some there is some error, the nearest parent object in the file, containing this error, is deleted
    if (!validatedJson) {
      // Prints the errors only the first time
      if (printError) {
        console.log(compiledSchema.errors);
        printError = false;
      }

      for (var index in compiledSchema.errors) {
        var path = compiledSchema.errors[index].dataPath;
        if (path === "") {
          // 'This' case happen when there is a problem in to the root of the json file (eg. when the file is empty)
          console.log("Fatal error: " + jsonPath + " is not setted up properly!");
          response.criticalError = true;
          validated = true;
        } else {
          jpointer.remove(json, path);
        }
      }
    } else {
      console.log("Validated: " + jsonPath);
      validated = true;
    }
  }

  return response;
}
