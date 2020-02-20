// Load dependencies
let axios = require('axios')
let log4js = require('log4js')

// Config log4js to log in file ./technical_test.log
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

// add shortcut
let logger = log4js.getLogger('technical_test');

// map list of workers and get position lat and lon
function getPosition(workers) {
    return Promise.all(workers.map(worker => {
        let accurate = true
        const {firstname, lastname, address: {streetname, city, country}} = worker;
        // check if firstname is defined
        if (typeof worker.firstname === 'undefined' || worker.firstname === ''){
            logger.error('Firstname is not set')
        }
        // check if lastname is defined
        if (typeof worker.lastname === 'undefined' || worker.lastname === ''){
            logger.error('Lastname is not set')
        }
        // check if streetname is defined
        if (typeof worker.address.streetname === 'undefined' || worker.address.streetname === ''){
            logger.error('Streetname is not set')
            accurate = false
        }
        // check if city is defined
        if (typeof worker.address.city === 'undefined' || worker.address.city === ''){
            logger.error('City is not set')
            accurate = false
        }
        return axios.get('https://api-adresse.data.gouv.fr/search/?q=' + streetname + ' ' + city)
            .then(response => {
                const [lon, lat] = response.data.features[0].geometry.coordinates;
                if (accurate === false) {
                    logger.error('datas for ' + firstname + ' ' + lastname + ' are not accurate. Please check them and retry')
                } else {
                    // check if worker city is the same as api result
                    let string = response.data.features[0].properties.city
                    let string2 = worker.address.city
                    if (string.normalize('NFD').replace(/[\u0300-\u036f]/g, "") !== string2.normalize('NFD').replace(/[\u0300-\u036f]/g, "")){
                        logger.error('This address does not exist in this city')
                    } else {
                        logger.info('Success call to API')
                        logger.info('Longitude and latitude for ' + firstname + ' ' + lastname + ' are ' + lon + ',' + lat)
                        return {
                            firstname: firstname,
                            lastname: lastname,
                            address: {streetname, country, city, lon, lat}
                        };
                    }
                }
            })
            .catch(() => {
                logger.error('API call does not work ! please check and retry')
            })
    }));
}

// export function getPosition
module.exports = {
    getPosition: getPosition
}
