//import express from "express";
//import routes from "./routes/main.js";
import serverm from "./serverm.js";

const app = serverm.app({port: 8080});
app.use(serverm.logger);

export default app;