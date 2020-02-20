// Load dependencies
let log4js = require('log4js')

// Config log4js to log in file ./technical_test.log
log4js.configure({
    appenders: { technical_test: { type: 'file', filename: 'technical_test.log' } },
    categories: { default: { appenders: ['technical_test'], level: 'info' } }
});

// Add shortcut
let logger = log4js.getLogger('technical_test')

// Define workers
let Workers = [
    {firstname: "Izi", lastname: 'Work', address: {streetname: "21 rue de Chartres", country: "FR", city: "Chateaudun"}},
    {firstname: "John", lastname: 'Doe', address: {streetname: "77 rue de Varenne", country: "FR", city: "Paris"}},
    {firstname: "Jade", lastname: 'Dupont', address: {streetname: "3 Avenue du Général Eisenhower", country: "FR", city: "Paris"}}
]

// Check if list of workers exist for export
if (typeof Workers !== "undefined" && Workers) {
    module.exports = Workers
    logger.info('List of workers exist')
} else {
    logger.error('List of workers do not exist')
}


