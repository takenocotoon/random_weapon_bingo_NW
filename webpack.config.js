const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./ts/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "template/js"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
