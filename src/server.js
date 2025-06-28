import express from "express";
import { connectDB } from "./config/db.js";
const app = express();
const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Dr.Tech Task on port ${PORT}`));
});
