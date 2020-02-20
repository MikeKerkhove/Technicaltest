let http = require('http')
let fs = require('fs')
let workers = require('./workers')
let action = require('./function')
let log4js = require('log4js')
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

let logger = log4js.getLogger('technical_test');


http.createServer((req, res) => {
    logger.info('Server is on')
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/html; charset=utf-8'
            })
            res.end('index.html does not exist')
            logger.error(err)
        } else {
            res.writeHead(200, {
                'content-type': 'text/html; charset=utf-8'
            })
            res.write(data)
            res.write('Salut les gens')
            logger.info('index.html is loaded')
            let result = action.getPosition(workers)
            res.end()
        }
    })
}).listen(8080)
