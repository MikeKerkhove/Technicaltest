let _ = require('lodash')
let https = require('https')
let log4js = require('log4js')
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

let logger = log4js.getLogger('technical_test');

function getPosition (workers) {
    _.find(workers, (n) => {
        let streetname = n.address.streetname
        let city = n.address.city
        let country = n.address.country
        https.get('https://api-adresse.data.gouv.fr/search/?q=' + streetname + city, (res) =>{
            let data = ''
            res.on('data', chunk => {
                data += chunk
            })
            res.on('end',() => {
                console.log(JSON.parse(data))
            })
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
    })
}

module.exports = {
    getPosition: getPosition
}
