import serverm from "./serverm.js";
import colorm from "./colorm.js";

const app = serverm.app({port: 8080});
app.use(serverm.basicLogger("tiny", {
  all: colorm.x1b(1),
  number: colorm.x1b(32),
  string: colorm.x1b(33),
  undefined: colorm.x1b(90),
}));

export default app;