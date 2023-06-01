import * as dotenv from "dotenv";
import cors from "cors";
import connectionToDatabase from "./database";
import express from "express";

// loaod environment variables from .env files where ATLAS_URI is defined
dotenv.config();

const { ATLAS_URI, SERVER_NAME, SERVER_PORT } = process.env;

// If uri is not defined then throw an error
if (!ATLAS_URI) {
  console.error("No ATLAS_URI environment vairable defined in config.env");
  process.exit();
}
// connect to DB
connectionToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());

    // start express server 
    app.listen(SERVER_PORT, () => {
      console.log('Server running at http://' + SERVER_NAME.toString() + ':' + SERVER_PORT.toString());
    })
  })
  .catch(error => console.error(error));