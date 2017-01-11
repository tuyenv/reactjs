module.exports = {
  entry: './src/index.jsx',
  output: { filename: './bundle.js' },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
};
