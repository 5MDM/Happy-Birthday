import express from "express";

const __dirname = "/home/runner/Happy-Birthday/";

const app = express();
app.use(express.static(__dirname + "public"));

app.get("/", (req, res) => {
  res.redirect("/home.html");
});

export default app;