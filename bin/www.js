import app from "../src/app.js";
import {createInterface} from "readline";

app.listen();

const terminalExit = createInterface({
  input: process.stdin,
  output: process.output,
});

console.log('"q" for exit');
function commandInput() {
  terminalExit.question("Input Commands:\n", command => {
    if(command == "q") {
      terminalExit.close();
      process.exit(0);
    } else {
      console.log("Bad Command");
    }
  });
};

commandInput();
