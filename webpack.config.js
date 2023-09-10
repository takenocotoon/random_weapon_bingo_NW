const path = require('path');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './ts/index.ts',
  output: {
    filename: 'main.dev.js',
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
  // plugins: [
  //   new WorkboxPlugin.GenerateSW(),  // Workboxプラグインを追加
  // ],
};
