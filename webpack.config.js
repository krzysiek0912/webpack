const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            filename: prod ? "[name].[chunkhash].js" : "[name].js",
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
        ],
    };
};
