import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";
const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");
const dirStyles = path.join(__dirname, "styles");
const dirShared = path.join(__dirname, "shared");
const dirNode = "node_modules";

export default {
  entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],

  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].js",
    publicPath: "/"
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "app"),
      path.resolve(__dirname, "assets"),
      path.resolve(__dirname, "shared"),
      "node_modules"
    ],
    extensions: ['.js', '.json', '.jpg', '.png', '.webp'],
    alias: {
      '@': path.resolve(__dirname, "app"),
      'pages': path.resolve(__dirname, "app/pages"),
      'components': path.resolve(__dirname, "app/components"),
      'animations': path.resolve(__dirname, "app/animations"),
      'classes': path.resolve(__dirname, "app/classes"),
      'utils': path.resolve(__dirname, "app/utils"),
      'vendors': path.resolve(__dirname, "app/vendors"),
      'shaders': path.resolve(__dirname, "app/shaders"),
      'shared': path.resolve(__dirname, "shared"),
      'lodash': path.resolve(__dirname, 'node_modules/lodash'),
      'gsap': path.resolve(__dirname, 'node_modules/gsap'),
      'ukiyojs': path.resolve(__dirname, 'node_modules/ukiyojs'),
      'splitting': path.resolve(__dirname, 'node_modules/splitting'),
      'locomotive-scroll': path.resolve(__dirname, 'node_modules/locomotive-scroll')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new webpack.ProvidePlugin({
      gsap: 'gsap',
      ScrollTrigger: ['gsap', 'ScrollTrigger'],
      TimelineMax: ['gsap', 'TimelineMax'],
      Expo: ['gsap', 'Expo'],
      Power2: ['gsap', 'Power2'],
      _: 'lodash',
      Ukiyo: 'ukiyojs',
      Splitting: 'splitting',
      LocomotiveScroll: 'locomotive-scroll'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./app/service-worker.js",
          to: ""
        },
        {
          from: "./offline.html",
          to: ""
        },
        {
          from: "./shared",
          to: ""
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer", {}],
                  ["cssnano", { preset: "default" }]
                ]
              },
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      },

      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: 'images/[name][ext]'
        }
      },

      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader", "glslify-loader"]
      }
    ]
  }
};
