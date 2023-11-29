/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require("dotenv").config();
const fs = require("fs");

let appConfigData = JSON.parse(fs.readFileSync("./config/server/server-config.json", "utf8"));

appConfigData.port.http = parseInt(process.env.LISTENING_HTTP_PORT, 10) || 3000;
appConfigData.port.https = parseInt(process.env.LISTENING_HTTPS_PORT, 10) || 3001;

fs.writeFile(
  "./config/server/server-config.json",
  JSON.stringify(appConfigData, null, 2),
  (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("App data written successfully");
    }
  },
);
