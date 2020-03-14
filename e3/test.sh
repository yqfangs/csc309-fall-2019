rm test.txt
rm reservations.json
rm restaurants.json
rm status.json
node app.js --addRest "Red Lobster" "Seafood at low prices"
node app.js --addRest "GOT7" "GOTTTTTTTTTT7"
node app.js --addRest "GOT7" "GOTTTTTTTTTT7"
node app.js --allRest
node app.js --restInfo "Red Lobster"
node app.js --addResv  "Red Lobster" "Mar 17 2019 17:15:00" 5
node app.js --addResv  "Red Lobster" "Mar 15 2019 12:15:00" 4
node app.js --addResv  "Red Lobster" "Mar 17 2019 13:15:00" 3
node app.js --addResv  "GOT7" "Mar 17 2019 13:30:00" 3
node app.js --addResv  "GOT7" "Mar 17 2019 14:14:59" 3
node app.js --addResv  "GOT7" "Mar 17 2019 14:16:00" 3
node app.js --addResv  "GOT7" "Mar 17 2019 14:00:00" 3
node app.js --addResv  "Red Lobster" "Mar 17 2019 13:30:00" 9
node app.js --allRest
node app.js --restInfo "Red Lobster"
node app.js --restInfo "GOT7"
node app.js --allResv "GOT7"
node app.js --allResv "Red Lobster"
node app.js --status
node app.js --addRest "KFC" "FRIED CHICKEN"
node app.js --restInfo "KFC"
node app.js --status
node app.js --allResv "Red Lobster"
node app.js --checkOff "Red Lobster"
node app.js --status
node app.js --allResv "Red Lobster"
node app.js --hourResv "Mar 17 2019 13:30:00"
node app.js --addDelay "Red Lobster" 60
node app.js --allResv "Red Lobster"
node app.js --addResv  "Red Lobster" "Mar 17 2019 14:29:59" 6
node app.js --addResv  "GOT7" "Mar 17 2019 15:29:59" 6
node app.js --addResv "KFC" "Mar 17 2019 15:30:30" 2
node app.js --hourResv "Mar 17 2019 14:30:00"
node app.js --addDelay "GOT7" 60
node app.js --hourResv "Mar 17 2019 14:30:00"



