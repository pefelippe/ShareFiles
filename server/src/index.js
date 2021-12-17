import cors from "cors";
import express from "express";
import fs from "fs";

import upload from "./upload.js";

const app = express();
const path = "db/";

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.body.file;
  res.status(200).json(file);
});

app.get("/files", async (req, res) => {
  fs.readdir(path, (err, files) => {
    if (!err) return res.status(200).json(files);
    return res.status(404).json();
  });
});

app.get("/download/:namefile", function (req, res) {
  const namefile = req.params.namefile;
  const file = `db/${namefile}`;
  res.download(file);
});

app.listen(3333, () => console.log("server started"));
