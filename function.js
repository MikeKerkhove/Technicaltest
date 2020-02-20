let _ = require('lodash')
let https = require('https')
let log4js = require('log4js')
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

let logger = log4js.getLogger('technical_test');

function getPosition (workers) {
    let result = []
    _.find(workers, (n) => {
        let firstname = n.firstname
        let lastname = n.lastname
        let streetname = n.address.streetname
        let city = n.address.city
        let country = n.address.country
        https.get('https://api-adresse.data.gouv.fr/search/?q=' + streetname + ' ' + city, (res) =>{
            let data = ''
            res.on('data', chunk => {
                data += chunk
            })
            res.on('end',() => {
                let infos = JSON.parse(data)
                let lon = infos.features[0].geometry.coordinates[0]
                let lat = infos.features[0].geometry.coordinates[1]
                let finalResult = {firstname: firstname, lastname: lastname, address: {streetname: streetname, country: country, city: city, lon: lon, lat: lat} }
                result.push(finalResult)
                console.log(result)
            })
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
    })
}

module.exports = {
    getPosition: getPosition
}
