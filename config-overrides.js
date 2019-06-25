const { override, fixBabelImports, addDecoratorsLegacy, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require('path');

const rewiredMap = () => config => {
    return Object.assign(config, {devtool: config.mode === 'development' ? 'source-map' : false})
  // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  // return config;
};

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
    }),
    rewiredMap()
)
