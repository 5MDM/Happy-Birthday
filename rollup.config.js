import json from "@rollup/plugin-json";
import cjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "./bin/www.js",
  output: {
    file: "./dist/bundle.js",
    format: "cjs",
    exports: "none",
  },
  plugins: [cjs(), nodeResolve(), json()],
};
