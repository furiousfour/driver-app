import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({

    endTrip(vehicleID){
        console.log("Request to end trip for " + vehicleID);
        VStatus.remove({vehicleID:vehicleID});
        try {
            const result = HTTP.call('GET', 'http://13.228.23.221/api/un-assign-ambulance', {
                params: {vehicle_id: vehicleID
                }
            });
            console.log("Result of post : " + JSON.stringify(result));
            return true;
        }catch(e){
            console.log(e);
            console.log("Got a network error, timeout, or HTTP error in the 400 or 500 range.");

        }
    },

    startTrip(tripData){
        console.log("Request to start the ambulance");

        try {
            const result = HTTP.call('GET', 'http://13.228.23.221/api/assign-ambulance', {
                params: {
                    vehicle_id: tripData.vehicleID,
                    des_lat: tripData.latitude,
                    des_long: tripData.longitude,
                    des_name: tripData.locationName
                }
            });
            console.log("Result of post : " + JSON.stringify(result));
            return true;
        } catch (e) {
            console.log(e);
            console.log("Got a network error, timeout, or HTTP error in the 400 or 500 range.");
            return false;
        }
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
