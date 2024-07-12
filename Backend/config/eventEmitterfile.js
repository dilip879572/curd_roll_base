var events = require('events');
var em = new events.EventEmitter();
em.setMaxListeners(0); // 0 to turn off the limit
module.exports.commonEmitter = em;