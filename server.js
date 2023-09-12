// const express = require("express");
// const colors = require("colors");
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

//config env
dotenv.config();

const app = express();

//database config
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors());
app.use(express.json()); // instead of url.bodyparser this used in express
app.use(morgan("dev")); // use see api data on console use morgan package
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//PORT
const PORT = process.env.PORT || 8080;
//rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome to ecommerce app</h1>");
});

//run listen
app.listen(PORT, () => {
  console.log(
    `Server is running on  ${process.env.DEV_MODE} mode on port : ${PORT}`
      .bgCyan.white
  );
});
