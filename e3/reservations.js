/* Reservations.js */ 
'use strict';

const log = console.log
const fs = require('fs');
const datetime = require('date-and-time')

const startSystem = () => {

	let status = {};

	try {
		status = getSystemStatus();
	} catch(e) {
		status = {
			numRestaurants: 0,
			totalReservations: 0,
			currentBusiestRestaurantName: null,
			systemStartTime: new Date(),
		}

		fs.writeFileSync('status.json', JSON.stringify(status))
	}

	return status;
}

/*********/


// You may edit getSystemStatus below.  You will need to call updateSystemStatus() here, which will write to the json file
const getSystemStatus = () => {
	updateSystemStatus()
	const status = fs.readFileSync('status.json')

	return JSON.parse(status)
}

/* Helper functions to save JSON */
// You can add arguments to updateSystemStatus if you want.
const updateSystemStatus = () => {
	const status = JSON.parse(fs.readFileSync('status.json'))
	
	/* Add your code below */

	status.numRestaurants = getAllRestaurants().length
	status.totalReservations = getAllReservations().length
	const restaurants = getAllRestaurants()
	let max = 0;
	restaurants.map((restaurant) =>{
		if(restaurant.numReservations > max){
			max = restaurant.numReservations
			status.currentBusiestRestaurantName = restaurant.name
		}
	})

	fs.writeFileSync('status.json', JSON.stringify(status))
}

const saveRestaurantsToJSONFile = (restaurants) => {
	/* Add your code below */
	fs.writeFileSync('restaurants.json', JSON.stringify(restaurants))

};

const saveReservationsToJSONFile = (reservations) => {
	/* Add your code below */
	fs.writeFileSync('reservations.json', JSON.stringify(reservations))

};

/*********/

// Should return an array of length 0 or 1.
const addRestaurant = (name, description) => {
	// Check for duplicate names
	const restaurants = getAllRestaurants()

	const restaurantWithName = restaurants.filter((restaurant) => restaurant.name === name)
	if(restaurantWithName.length > 0){
		return [];
	}

	// if no duplicate names:

	const restaurant = {
		name,
		description,
		numReservations: 0

	}; // remove null and assign it to proper value

	restaurants.push(restaurant)
	saveRestaurantsToJSONFile(restaurants)
	return [restaurant];

}

// should return the added reservation object
const addReservation = (restaurant, time, people) => {
	
	/* Add your code below */
	// const resvTime = new Date(time)
	//log(resvTime)
	const reservations = getAllReservations()
	const reservation = {
		restaurant,
		time: new Date(time),
		people
	}; // remove null and assign it to proper value
	
	// update reservation number on restaurant
	const restaurants = getAllRestaurants()
	const restaurantWithName = restaurants.filter((rest) => rest.name === restaurant)
	restaurantWithName[0].numReservations += 1

	reservations.push(reservation)
	saveReservationsToJSONFile(reservations)
	saveRestaurantsToJSONFile(restaurants)
	return reservation;

}


/// Getters - use functional array methods when possible! ///

// Should return an array - check to make sure restaurants.json exists
const getAllRestaurants = () => {
	/* Add your code below */
	try {
		const allRestaurants = fs.readFileSync("restaurants.json")
		return JSON.parse(allRestaurants)
	} catch (e) {
		return []
	}
};

// Should return the restaurant object if found, or an empty object if the restaurant is not found.
const getRestaurantByName = (name) => {
	/* Add your code below */
	const restaurants = getAllRestaurants()
	const restaurantWithName = restaurants.filter((restaurant) => restaurant.name === name)
	return restaurantWithName[0]

};

// Should return an array - check to make sure reservations.json exists
const getAllReservations = () => {
  /* Add your code below */
  	try {
		const allReservations = fs.readFileSync('reservations.json')
		return JSON.parse(allReservations)
	} catch (e) {
		return []
	}

};

// Should return an array
const getAllReservationsForRestaurant = (name) => {
	/* Add your code below */
	const reservations = getAllReservations()
	const restReservations = reservations.filter((reservation) => reservation.restaurant === name)
	restReservations.sort((a, b) => {
		if(a.time > b.time){
			return 1
		}else if(a.time < b.time){
			return -1 
		}else{
			return 0
		}
	});
	return restReservations
};


// Should return an array
const getReservationsForHour = (time) => {
	/* Add your code below */
	const requestTime = new Date(time)
	// const next = new Date(time).addHours(requestTime, 1)
	// log(requestTime)
	// log(next)
	const reservations = getAllReservations()
	const hourReservations = reservations.filter((reservation) =>{
		const rTime = new Date(reservation.time)
		return datetime.subtract(rTime, requestTime).toSeconds() < 3600 && datetime.subtract(rTime, requestTime).toSeconds() >=0;
	})
	hourReservations.sort((a, b) => {
		if(a.time > b.time){
			return 1
		}else if(a.time < b.time){
			return -1 
		}else{
			return 0
		}
	});
	return hourReservations

}

// should return a reservation object
const checkOffEarliestReservation = (restaurantName) => {
	const reservations = getAllReservations()
	const checkedOffReservation = getAllReservationsForRestaurant(restaurantName)[0]; // remove null and assign it to proper value
 
 	const checkedOff = reservations.filter((reservation) => {
 		return JSON.stringify(reservation) !== JSON.stringify(checkedOffReservation)
 	})
 	//update restaurant
 	const restaurants = getAllRestaurants()
	const restaurantWithName = restaurants.filter((rest) => rest.name === restaurantName)
	restaurantWithName[0].numReservations -= 1

	saveRestaurantsToJSONFile(restaurants)
	saveReservationsToJSONFile(checkedOff)

 	return checkedOffReservation;
}


const addDelayToReservations = (restaurant, minutes) => {
	// Hint: try to use a functional array method
	const reservations = getAllReservations();
	const delayed = reservations.map((reservation) => {
		if(reservation.restaurant === restaurant){
			const time = new Date(reservation.time);
			reservation.time = datetime.addMinutes(time, minutes)
		}
		return reservation;
	})
	//log(delayed)
	saveReservationsToJSONFile(delayed)
	const result = delayed.filter((reservation) => reservation.restaurant === restaurant)
	result.sort((a, b) => {
		if(a.time > b.time){
			return 1
		}else if(a.time < b.time){
			return -1 
		}else{
			return 0
		}
	});
	return result;
}

startSystem(); // start the system to create status.json (should not be called in app.js)

// May not need all of these in app.js..but they're here.
module.exports = {
	addRestaurant,
	getSystemStatus,
	getRestaurantByName,
	getAllRestaurants,
	getAllReservations,
	getAllReservationsForRestaurant,
	addReservation,
	checkOffEarliestReservation,
	getReservationsForHour,
	addDelayToReservations
}

