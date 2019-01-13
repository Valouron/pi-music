const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProd = process.argv.indexOf('production') > -1;
const resolve = (s) => path.join(__dirname, s);

const extractSass = new MiniCssExtractPlugin({
    filename: isProd ? '[name]-[hash:8].css': '[name].css',
    disable: !isProd,
});

const hash = 'sha1:hash:hex:8';

module.exports = {
    entry: {
        player: './src/player/index.tsx',
        control: './src/control/index.tsx'
    },
    output: {
        filename: '[name].js',
        path: resolve('build/'),
    },
	devtool: isProd ? false: 'inline-source-map',
    devServer: {
        port: 8005,
        compress: true,
        contentBase: 'public/',
        https: true,
        //stats: 'verbose',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/player/index.html',
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['player']
        }),
        new HtmlWebpackPlugin({
            template: 'src/control/index.html',
            filename: 'control.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['control']
        }),
        extractSass
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: extractSass.extract({
            //         use: 'css-loader',
            //         fallback: 'style-loader'
            //     }),
            // },
            {
                test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `file-loader?name=fonts/[${hash}].[ext]`,
            },
            {
                test:  /\.otf$/,
                use: `file-loader?name=fonts/[${hash}].[ext]`,
            },
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `file-loader?name=fonts/[${hash}].[ext]`,
            },
            {
                test:  /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `file-loader?name=fonts/[${hash}].[ext]`,
            },
            {
                test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `file-loader?name=fonts/[${hash}].[ext]`,
            },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `file-loader?name=fonts/[${hash}].[ext]`,
            },
            {
                test: /\.png$/,
                use: `file-loader?name=img/[${hash}].[ext]`,
            },
            {
                test: /\.jpg$/,
                use: `file-loader?name=img/[${hash}].[ext]`,
            },
            {
                test: /\.webm$/,
                use: `file-loader?name=vid/[${hash}].[ext]`,
            },
            {
                test: /\.mp4$/,
                use: `file-loader?name=vid/[${hash}].[ext]`,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};
