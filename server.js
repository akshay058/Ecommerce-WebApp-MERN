// const express = require("express");
// const colors = require("colors");
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

//config env
dotenv.config();

const app = express();

//database config
connectDB();

//middlewares
app.use(express.json()); // instead of url.bodyparser this used in express
app.use(morgan("dev")); // use see api data on console use morgan package

//PORT
const PORT = process.env.PORT || 8080;

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome to ecommerce app</h1>");
});

app.listen(PORT, () => {
  console.log(
    `Server is running on  ${process.env.DEV_MODE} mode on port : ${PORT}`
      .bgCyan.white
  );
});
