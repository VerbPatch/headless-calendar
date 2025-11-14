const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const typescript = require("@rollup/plugin-typescript");
const marko = require("@marko/rollup");
const pkg = require("./package.json");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
  ],
  external: ["marko", "@verbpatch/headless-calendar"],
  plugins: [
    peerDepsExternal(),
    marko.default.browser(),
    resolve({
      browser: true,
      extensions: ['.js', '.marko']
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
    }),
    terser(),
  ],
};