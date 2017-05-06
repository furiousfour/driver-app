import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({

    endTrip(vehicleID){
        console.log("Request to end trip for " + vehicleID);
        VStatus.remove({vehicleID:vehicleID});
    },

    logPosition(vehicleID, isOccupied, position) {
        console.log("---> " + vehicleID + " : " + position.latitude + ", " + position.longitude)

        try {
            const result = HTTP.call('GET', 'http://13.228.23.221/api/vehicle/log', {
                params: {
                    vehicleID : vehicleID,
                    latitude: position.latitude,
                    longitude: position.longitude,
                    accuracy: position.accuracy,
                    speed: position.speed,
                    heading: position.heading,
                    isOccupied: isOccupied
                }
            });
            console.log("Result of post : " + JSON.stringify(result));
            return true;
        } catch (e) {
            console.log(e);
            console.log("Got a network error, timeout, or HTTP error in the 400 or 500 range.");
            return false;
        }

    }
});
