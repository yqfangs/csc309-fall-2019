'use strict';

//const reservations = require('./reservations');

// datetime available if needed
const datetime = require('date-and-time') 

const now = new Date("Mar 17 2019 17:15:00")
console.log(now);
const str = datetime.format(now, 'MMM DD YYYY at h:mm A')
console.log(str)