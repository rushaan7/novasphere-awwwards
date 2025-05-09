import { merge } from "webpack-merge";
import path from "path";
import { fileURLToPath } from "url";
import config from "./webpack.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.json', '.jpg', '.png', '.webp'],
    modules: [
      path.resolve(__dirname, "app"),
      path.resolve(__dirname, "assets"),
      path.resolve(__dirname, "shared"),
      "node_modules"
    ],
    alias: {
      '@': path.resolve(__dirname, "app"),
      'pages': path.resolve(__dirname, "app/pages"),
      'components': path.resolve(__dirname, "app/components"),
      'animations': path.resolve(__dirname, "app/animations"),
      'classes': path.resolve(__dirname, "app/classes"),
      'utils': path.resolve(__dirname, "app/utils"),
      'vendors': path.resolve(__dirname, "app/vendors"),
      'shaders': path.resolve(__dirname, "app/shaders"),
      'shared': path.resolve(__dirname, "shared")
    }
  }
});
