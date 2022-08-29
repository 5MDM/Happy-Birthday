import express from "express";
import fs from "fs";

const __dirname = "/home/runner/Happy-Birthday/";

const app = express();
app.use(express.static(__dirname + "public"));

app.get("/", (req, res) => {
  // res.redirect("/home.html");
  res.redirect("/game.html");
});

app.get("*", (req, res) => {
  if(fs.existsSync(req.url)) {
    res.redirect(req.url);
  } else {
    res.redirect("/404.html");
  }
});

export default app;