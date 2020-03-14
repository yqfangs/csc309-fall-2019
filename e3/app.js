/* E3 app.js */
'use strict';

const log = console.log
const yargs = require('yargs').option('addRest', {
    type: 'array' // Allows you to have an array of arguments for particular command
  }).option('addResv', {
    type: 'array' 
  }).option('addDelay', {
    type: 'array' 
  })

const reservations = require('./reservations');

// datetime available if needed
const datetime = require('date-and-time') 

const yargs_argv = yargs.argv
//log(yargs_argv) // uncomment to see what is in the argument array

if ('addRest' in yargs_argv) {
	const args = yargs_argv['addRest']
	const rest = reservations.addRestaurant(args[0], args[1]);	
	if (rest.length > 0) {
		/* complete */ 
		const str = `Added restaurant ${rest[0].name}.`
		log(str)
	} else {
		/* complete */ 
		log("Duplicate restaurant not added.")

	}
}

if ('addResv' in yargs_argv) {
	const args = yargs_argv['addResv']
	const resv = reservations.addReservation(args[0], args[1], args[2]);

	// Produce output below
	const timeStr = datetime.format(resv.time, 'MMM DD YYYY at h:mm A');
	const str = `Added reservation at ${resv.restaurant} on ${timeStr} for ${resv.people} people.`
	log(str)
	
}

if ('allRest' in yargs_argv) {
	const restaurants = reservations.getAllRestaurants(); // get the array
	
	// Produce output below
	restaurants.map((restaurant) => {
		const str = `${restaurant.name}: ${restaurant.description} - ${restaurant.numReservations} active reservations`
		log(str)
	})
}

if ('restInfo' in yargs_argv) {
	const restaurants = reservations.getRestaurantByName(yargs_argv['restInfo']);

	// Produce output below
	if(restaurants != null){
		const str = `${restaurants.name}: ${restaurants.description} - ${restaurants.numReservations} active reservations`
		log(str)
	}
}

if ('allResv' in yargs_argv) {
	const restaurantName = yargs_argv['allResv']
	const reservationsForRestaurant = reservations.getAllReservationsForRestaurant(restaurantName); // get the arary
	
	// Produce output below
	log("Reservations for " + restaurantName + ":");
	reservationsForRestaurant.map((reservation) => {
		const time = new Date(reservation.time)
		const timeStr = datetime.format(time, 'MMM DD YYYY, h:mm A');
		const str = `- ${timeStr}, table for ${reservation.people}`
		log(str)
	})

}

if ('hourResv' in yargs_argv) {
	const time = yargs_argv['hourResv']
	const reservationsForRestaurant = reservations.getReservationsForHour(time); // get the arary
	
	// Produce output below
	log("Reservations in the next hour:")
	reservationsForRestaurant.map((reservation) => {
		const time = new Date(reservation.time)
		const timeStr = datetime.format(time, 'MMM DD YYYY, h:mm A');
		const str = `- ${reservation.restaurant}: ${timeStr}, table for ${reservation.people}`
		log(str)
	})

}

if ('checkOff' in yargs_argv) {
	const restaurantName = yargs_argv['checkOff']
	const earliestReservation = reservations.checkOffEarliestReservation(restaurantName); 
	
	// Produce output below
	const time = new Date(earliestReservation.time)
	const timeStr = datetime.format(time, 'MMM DD YYYY, h:mm A');
	const str = `Checked off reservation on ${timeStr}, table for ${earliestReservation.people}`
	log(str);
}

if ('addDelay' in yargs_argv) {
	const args = yargs_argv['addDelay']
	const resv = reservations.addDelayToReservations(args[0], args[1]);	

	// Produce output below
	log("Reservations for " + args[0] + ":");
	resv.map((reservation) => {
		const time = new Date(reservation.time)
		const timeStr = datetime.format(time, 'MMM DD YYYY, h:mm A');
		const str = `- ${timeStr}, table for ${reservation.people}`
		log(str)
	})
	
}

if ('status' in yargs_argv) {
	const status = reservations.getSystemStatus()

	// Produce output below
	log("Number of restaurants: " + status.numRestaurants) 
	log("Number of total reservations: " + status.totalReservations)
	log("Busiest restaurant: " + status.currentBusiestRestaurantName)
	const time = new Date(status.systemStartTime)
	const timeStr = datetime.format(time, 'MMM DD YYYY, h:mm A');
	log("System started at: " + timeStr)
}

