const { override, fixBabelImports, addDecoratorsLegacy, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addDecoratorsLegacy(),
    addWebpackAlias({ '@src': path.resolve(__dirname, 'src') }),
    addLessLoader({
      javascriptEnabled: true,
    })
)
