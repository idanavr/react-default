const fs = require('fs');
const path = require('path');

const LOG_PATH = global.config.logPath;

class logger {

    constructor(fileName) {
        this._fileName = fileName;
    }

    _ensureDirectoryExists(filePath) {
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            this._ensureDirectoryExists(dirname);
            fs.mkdirSync(dirname);
        }
    }

    _formatDateToTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    _saveLog(type, log, obj) {
        const todayDate = new Date(Date.now());
        const dateTodayFormatted = `${todayDate.getDate()}-${todayDate.getMonth() + 1}-${todayDate.getFullYear()}`;
        const filePath = `${LOG_PATH}/${dateTodayFormatted}.log`;
        const timeNow = this._formatDateToTime(todayDate);
        let message = `[${timeNow}][${type}] ${this._fileName ? `${this._fileName}` : ''} - ${log.stack ? log.stack : log} \r\n`;
        if (obj)
            message += `Parameters: ${JSON.stringify(obj)} \r\n`;

        console.log(`logger - ${message}`);

        this._ensureDirectoryExists(filePath);
        fs.appendFile(filePath, message, { flag: 'a' }, (err) => {
            if (err)
                console.log(err);
        });
    }

    info(msg, params) {
        this._saveLog('Info', msg, params);
    }

    warn(msg, params) {
        this._saveLog('Warn', msg, params);
    }

    error(msg, params) {
        this._saveLog('Error', msg, params);
    }
}

module.exports = logger;