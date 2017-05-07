const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const port = 3000;

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler, {log:console.log}));

// app.set('engine', 'ejs')
// app.use('/style', express.static(path.join(__dirname, 'style')))

// app.get("/", (req, res) => {
//     res.send('hey')
// });

app.get("*", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, error => {
    if (error)
        console.log(error)
    else
        console.log('Listening on port ', port);
})