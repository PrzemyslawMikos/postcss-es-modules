const { postcssEsModules }  = require('postcss-es-modules');

module.exports = (ctx) => ({
    plugins: [
        postcssEsModules({
            modules: {
                attachOriginalClassName: true
            },
            loader: {
                script: 'eject',
                scriptType: 'ts',
                scriptEjectPath: __dirname + '/src/styles-loader'
            }
        }),
    ]
})
