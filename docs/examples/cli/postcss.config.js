const { postcssEsModules }  = require('postcss-es-modules');

module.exports = (ctx) => ({
    plugins: [
        postcssEsModules({
            inject: {
                script: "eject",
                scriptEjectPath: __dirname + "/src/styles-inject"
            }
        }),
    ]
})
