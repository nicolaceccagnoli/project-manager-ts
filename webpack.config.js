import path = require('path');

module.exports = {
    // Il punto d'ingresso da utilizzare per ogni progetto
    entry: './src/app.ts',
    output: {
        // Il nome del file che verrà generato alla fine
        filename: 'bundle.js',
        // Dove andrà inserito quel file
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // Array di regole da rispettare, potrebbero essere più di una
        rules: [
            // Descrive un test che Webpack farà su ogni file
            test: /.ts$/,
            // Si specifica quale loader dovrà utilizzare webpack
            use: 'ts-loader',
            // Diciamo a Webpack cosa escludere
            exclude: /node_modles/
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}