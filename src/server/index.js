import express from 'express';
import webpack from 'webpack';
import morgan from 'morgan';
import originalClientWebpackConfig from '../../webpack.client.babel.js';
import ssrMiddleware from './middlewares/ssrMiddleware.jsx';

const app = express();

app.use(morgan('combined', {}));

app.use(ssrMiddleware);

// eslint-disable-next-line
if (__DEVELOPMENT__) {
  const clientWebpackConfig = {
    ...originalClientWebpackConfig,
    entry: {
      app: [
        'webpack-hot-middleware/client',
        ...originalClientWebpackConfig.entry.app
      ]
    },
    output: {
      ...originalClientWebpackConfig.output,
      path: '/',
      publicPath: '/',
    }
  };

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(clientWebpackConfig);
  app.use(webpackDevMiddleware(
    compiler, { publicPath: '/', }
  ));
  app.use(webpackHotMiddleware(compiler));

} else {
  // eslint-disable-next-line
  app.use(express.static(__dirname + '/../public'));
}

app.listen(3001, function() {
  // eslint-disable-next-line
  console.log('Server listening at port 3001.');
});
