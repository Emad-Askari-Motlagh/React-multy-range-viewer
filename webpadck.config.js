// webpack.config.js
const path = require("path");

module.exports = {
  // other configuration...
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "ReactMultiDateRange.js",
    library: "ReactMultiDateRange",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // other loaders...
    ],
  },
};
