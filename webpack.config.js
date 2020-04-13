const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  
  entry: {
    main: path.resolve(__dirname, './source/assets/javascripts/index.js'),
    cms: path.resolve(__dirname,'./source/assets/javascripts/cms.js')
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  optimization: { 
    minimize: true, 
    minimizer: [ 
      new TerserPlugin({ 
        cache: true, 
        parallel: true, 
        terserOptions: { 
          output: {
            comments: false
          }
        }
      }), 
    ]
  }
};
