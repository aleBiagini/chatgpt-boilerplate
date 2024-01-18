import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { generateResponse } from "./controllers";

dotenv.config();

const cors = require("cors");
const port = process.env.PORT;
const https = require('node:https');
const fs = require('node:fs');
const options = {
  key: fs.readFileSync('certs/localhost+2-key.pem'),
  cert: fs.readFileSync('certs/localhost+2.pem'),
};

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: "https://localhost:4200",
}
));

app.post("/api/generate", generateResponse);

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
