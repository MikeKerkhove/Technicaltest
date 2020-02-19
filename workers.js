let log4js = require('log4js');
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

let logger = log4js.getLogger('technical_test');

let Workers = [
    {firstname: "Izi", lastname: 'Work', address: {streetname: "21 rue de Chateaudun", country: "FR", city: "Paris"}},
    {firstname: "John", lastname: 'Doe', address: {streetname: "77 rue de Varenne", country: "FR", city: "Paris"}},
    {firstname: "Jade", lastname: 'Dupont', address: {streetname: "3 Avenue du Général Eisenhower", country: "FR", city: "Paris"}}
]

if (typeof Workers !== "undefined" && Workers) {
    module.exports = Workers
} else {
    logger.error('List of workers do not exist')
}


