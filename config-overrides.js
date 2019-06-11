const { override, fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addDecoratorsLegacy(),
    addWebpackAlias({ '@': path.resolve(__dirname, 'src') })
)
