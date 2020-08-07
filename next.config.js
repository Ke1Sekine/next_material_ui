const path = require('path')

module.exports = {
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