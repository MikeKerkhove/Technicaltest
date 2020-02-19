let log4js = require('log4js');
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

let logger = log4js.getLogger('technical_test');

function getPosition (workers) {
    if (typeof workers === "undefined" && workers){
        logger.error('List of workers is undefined')
    } else {
        logger.info('List of workers created');
    }
}

module.exports = {
    getPosition: getPosition
}
