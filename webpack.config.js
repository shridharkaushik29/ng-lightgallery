module.exports = (env = {}) => {
    return {
        mode: env.mode,
        output: {
            filename: env.mode === 'development' ? 'ng-lightgallery.js' : 'ng-lightgallery.min.js'
        },
        externals: {
            angular: "angular",
            jquery: "jQuery",
            lodash: "_"
        }
    }
}
