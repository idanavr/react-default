const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { initializeAuthentication } = require('../auth');

const setMiddlewaresBeforeRouting = (app) => {
    app.use(bodyParser.json());
    app.use(compression());
    app.use(helmet());
    app.use(cookieParser());
    app.use(passport.initialize());
};

const setMiddlewaresAfterRouting = (app, env) => {
    if (env === 'development')
        _setWebpackMiddleware(app);
    initializeAuthentication();
};

// webpack setting with hot reload
const _setWebpackMiddleware = (app) => {
    const webpackConfig = require('./webpack.config.dev');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const devMiddleware = webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: webpackConfig.output.publicPath });
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler, { log: console.log }));

    app.use('*', (req, res, next) => {
        const filename = `${compiler.outputPath}/index.html`;
        devMiddleware.waitUntilValid(() => {
            compiler.outputFileSystem.readFile(filename, (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                res.set('content-type', 'text/html');
                res.send(result);
            });
        });
    });
};

module.exports = { setMiddlewaresBeforeRouting, setMiddlewaresAfterRouting };