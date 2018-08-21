/**
 * Build configuration
 */

"use strict";

const path = require("path");

const srcPath = path.join(__dirname, "src");

module.exports = {
  entry: path.join(srcPath, "index.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "ts-loader",
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};
