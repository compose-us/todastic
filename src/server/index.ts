import express from "express";
import path from "path";

const app = express();

app.use("/", express.static(path.resolve(__dirname, "../client")));

app.listen(8080);

// eslint-disable-next-line no-console
console.log("hello world.");
