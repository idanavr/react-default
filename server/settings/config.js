const envType = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test' ? 'test' : 'production';

const config = {
    production: {
        connStr: process.env.reactdefaultProdDB || '',
        logPath: 'log/production',
    },
    test: {
        connStr: process.env.reactdefaultTestDB || '',
        logPath: 'log/test',
    },
    common: {
        port: 3000,
        jwtKey: 'somePrivateKey',        
    }
};


module.exports = Object.assign(config.common, config[envType]);