const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env, argv) {
    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;

    return {
        mode: prod ? "production" : "development",
        devtool: prod ? "source-maps" : "eval",
        entry: {
            app: "./src/js/index.js",
        },
        output: {
            filename: prod ? "assets/js/[name].[chunkhash].js" : "assets/js/[name].js",
            path: path.resolve(__dirname, "dist"),
        },
        devtool: "source-map", // any "source-map"-like devtool is possible
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // fallback to style-loader in development
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[name].[ext]",
                        },
                    },
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
                chunkFilename: "[id].css",
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new CopyPlugin({
                patterns: [{ from: "src/assets/img", to: "assets/img" }],
            }),
        ],
    };
};
