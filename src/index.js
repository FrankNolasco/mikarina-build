"use strict";
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 9999;

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(morgan("dev"));
app.use(function (req, res, next) {
  //acceso a conexiones que requieran a esta conexion
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", ["Origin,X-Requested-With,Content-type,Accept", "application/json", "text/json"]);
  res.header("Access-Control-Allow-Methods", ["GET", "POST"]);
  next();
});
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});
