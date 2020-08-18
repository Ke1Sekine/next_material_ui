const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = {
    trailingSlash: true,
    cssModules: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    exportTrailingSlash: true,
    exportPathMap: async function() {
        const paths = {
            '/': { page: '/' },
        };
        return paths;
    },
}
