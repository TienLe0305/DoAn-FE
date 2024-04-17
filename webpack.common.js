const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
module.exports ={
    entry: {
      popup: path.resolve("src/popup/index.tsx"),
      background: path.resolve("src/background/background.ts"),
      contentScript: path.resolve("src/contentScript/index.tsx"),
    },
    module: { 
      rules: [
        {
          use: "ts-loader",
          test: /\.tsx?$/,
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
          use: "file-loader?name=assets/images/[name].[ext]",
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: ".env",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve("src/static"),
            to: path.resolve("build"),
          },
        ],
      }),
      ...getHtmlPlugins(["popup"]),
    ],
    resolve: {
      extensions: [".tsx", ".js", ".ts"],
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "build"),
      clean: true,
    },
    optimization: {
      splitChunks: false,
      moduleIds: "named",
      chunkIds: "named",
    },
  };
function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "CWAsisstant",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
