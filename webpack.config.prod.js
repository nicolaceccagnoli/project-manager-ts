const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    // Il punto d'ingresso da utilizzare per ogni progetto
    entry: './src/app.ts',
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
    output: {
        // Il nome del file che verrà generato alla fine
        filename: 'bundle.js',
        // Dove andrà inserito quel file
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    // Miglioriamo la nostra esperienza di debug
    devtool: 'inline-source-map',
    module: {
        // Array di regole da rispettare, potrebbero essere più di una
        rules: [ 
            {
                // Descrive un test che Webpack farà su ogni file
                test: /\.ts$/,
                // Si specifica quale loader dovrà utilizzare webpack
                use: 'ts-loader',
                // Diciamo a Webpack cosa escludere
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
}