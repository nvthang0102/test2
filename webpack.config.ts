const Dotenv = require('dotenv-webpack');
 
module.exports = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader'}
    },
    { 
      test: /\.css?$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
      ]
    },
    {
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ]
    },
  ],
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      fs: false,
      "os": false,
      "path": false,
    }
},
node: {
  fs: "empty"
},
// 
  plugins: [
    new Dotenv({
        path: './some.other.env' 
    }),
    
  ]
  
};