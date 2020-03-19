const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
const envType = env === 'test' ? 'test' : 'production';

const config = {
    production: {
        connStr: process.env.reactdefaultProdDB || '',
        logPath: 'log/production',
    },
    test: {
        logPath: 'log/test',
    },
    common: {
        port: 3000,
        env,
        jwtKey: 'somePrivateKey',
        cookiesSessionInSecs: 604800, // 7 days
    }
};


module.exports = Object.assign(config.common, config[envType]);