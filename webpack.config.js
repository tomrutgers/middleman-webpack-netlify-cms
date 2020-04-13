const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV
const filename = env == 'production' ? '[name].[contenthash]' : 'name'


const externals = [
  {
    name: `react`,
    global: `React`,
    assetDir: `umd`,
    assetName: `react.production.min.js`,
  },
  {
    name: `react-dom`,
    global: `ReactDOM`,
    assetDir: `umd`,
    assetName: `react-dom.production.min.js`,
  },
  {
    name: `netlify-cms-app`,
    global: `NetlifyCmsApp`,
    assetDir: `dist`,
    assetName: `netlify-cms-app.js`,
  },
]

module.exports = {
  
  entry: {
    main: path.resolve(__dirname, './source/assets/javascripts/index.js'),
    cms: path.resolve(__dirname,'./source/assets/javascripts/cms.js')
  },

  output: {
    path: __dirname + '/dist',
    filename: `${filename}.js`
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
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },

  externals: externals.map(({ name, global }) => {
    return {
      [name]: global,
    }
  }),

  plugins: [
    new CopyPlugin(
      [].concat.apply(
        [],
        externals.map(({ name, assetName, sourceMap, assetDir }) =>
          [
            {
              from: require.resolve(path.join(name, assetDir, assetName)),
              to: `${filename}`,
            }
          ].filter(item => item)
        )
      )
    ),

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: `${filename}.css`
    })
  ],

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
