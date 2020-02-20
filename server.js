// Load dependencies
let http = require('http')
let workers = require('./workers')
let action = require('./function')
let _ = require('lodash')
let log4js = require('log4js')

// Config log4js to log in file ./technical_test.log
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

// add shortcut
let logger = log4js.getLogger('technical_test');

// Log
logger.info('Server launch')

// create web server to display result
http.createServer((req, res) => {
    if (req.url != '/favicon.ico') {
        logger.info('Server is on')
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        action.getPosition(workers).then(allResults => {
            _.forEach(allResults, () => {
                res.end(JSON.stringify(allResults));
            })
            logger.info('All is done')
        })
    }
}).listen(8080)
