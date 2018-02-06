const { injectBabelPlugin, getLoader } = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

const path = require('path');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/components/icon/assets'),  // 2. 自己私人的 svg 存放目录
];

module.exports = function override(config, env) {
  // babel-plugin-import
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    //style: 'css',
    style: true, // use less for customized theme
  }], config);

  // customize theme
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            // theme vars, also can use theme.js instead of this.
            modifyVars: { "@brand-primary": "#1DA57A" },
          },
        },
      ]
    }
  );

  // css-modules
  // config.module.rules[1].oneOf.unshift(
  //   {
  //     test: /\.css$/,
  //     exclude: /node_modules|antd-mobile\.css/,
  //     use: [
  //       require.resolve('style-loader'),
  //       {
  //         loader: require.resolve('css-loader'),
  //         options: {
  //           modules: true,
  //           importLoaders: 1,
  //           localIdentName: '[local]___[hash:base64:5]'
  //         },
  //       },
  //       {
  //         loader: require.resolve('postcss-loader'),
  //         options: {
  //           // Necessary for external CSS imports to work
  //           // https://github.com/facebookincubator/create-react-app/issues/2677
  //           ident: 'postcss',
  //           plugins: () => [
  //             require('postcss-flexbugs-fixes'),
  //             autoprefixer({
  //               browsers: [
  //                 '>1%',
  //                 'last 4 versions',
  //                 'Firefox ESR',
  //                 'not ie < 9', // React doesn't support IE8 anyway
  //               ],
  //               flexbox: 'no-2009',
  //             }),
  //           ],
  //         },
  //       },
  //     ]
  //   }
  // );
  
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.(svg)$/i,
      loader: 'svg-sprite',
      include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
    }
  );
  // file-loader exclude
  let l = getLoader(config.module.rules, fileLoaderMatcher);
  l.exclude.push(/\.less$/);



  return config;
};