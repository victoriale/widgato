var prebid = require('./package.json');
var StringReplacePlugin = require('string-replace-webpack-plugin');
var path = require('path');

module.exports = {
  output: {
    filename: 'prebid.js'
  },
  resolve: {
    modulesDirectories: ['', 'node_modules', 'prebid']
  },
  resolveLoader: {
    modulesDirectories: ['loaders', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /adaptermanager.js/,
        include: /(prebid)/,
        loader: 'analyticsLoader'
      },
      {
        test: /adaptermanager.js/,
        include: /(prebid)/,
        loader: 'adapterLoader'
      },
      {
        test: /constants.json$/,
        include: /(prebid)/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /%%REPO_AND_VERSION%%/g,
              replacement: function (match, p1, offset, string) {
                return ``;
              }
            }
          ]
        })
      },
        {
          test: /\.js$/,
          include: /(prebid|test|integrationExamples)/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /\$\$PREBID_GLOBAL\$\$/g,
                replacement: function (match, p1, offset, string) {
                    return prebid.globalVarName;
                }
              }
            ]
          })
        }
    ]
  },
  plugins: [
    new StringReplacePlugin()
  ]
};
