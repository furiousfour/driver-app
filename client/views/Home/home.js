Template.Home.helpers({
    getCurrentPosition: function(){
        return Session.get("currentPosition");
    },
    isOccupied: function () {
        return Session.get("currentStatus");
    }
});

Template.Home.events({
    'click .doneButton': function (event) {
        event.preventDefault();
        Meteor.call('endTrip', Session.get("vehicleID"));
        Session.set("currentStatus", false);
        Session.set("isOccupied", false);
    },
    'click .stopBroadcasting': function(event){
        event.preventDefault();
        Location.stopWatching();
    },
    '.click .signal1': function(event){
        event.preventDefault();
        Session.set("currentPosition", {latitude: 12.9568488, longitude:  80.2369307});
        Meteor.call('logPosition', Session.get("vehicleID"), Session.get("isOccupied").toString(), pos);
    },

    '.click .signal2': function(event){
        event.preventDefault();
        Session.set("currentPosition", {latitude: 12.948812, longitude: 80.2387663});
        Meteor.call('logPosition', Session.get("vehicleID"), Session.get("isOccupied").toString(), pos);
    },

    '.click .signal3': function(event){
        event.preventDefault();
        Session.set("currentPosition", {latitude: 12.948884, longitude: 80.2079273});
        Meteor.call('logPosition', Session.get("vehicleID"), Session.get("isOccupied").toString(), pos);
    }


});

if(Meteor.isClient) {
    Template.Home.onRendered(function () {
        var returnObject = {latitude:"browser", longitude:"browser" }
        Session.set("currentPosition", returnObject);

    });
}

if(Meteor.isCordova){
    Template.Home.onRendered(function () {

        Session.set("currentStatus", false);
        Session.set("isOccupied", false);



        Location.startWatching(function (pos) {
            console.log("Got a position in phone!", pos);
            Meteor.call('logPosition', Session.get("vehicleID"), Session.get("isOccupied").toString(), pos);
            console.log("Sending : " +
                "VehicleID" + Session.get("vehicleID") +
                "latitude" + pos.latitude +
                "longitude" + pos.longitude +
                "isOccupied" + Session.get("isOccupied")
            );
            Session.set("currentPosition", pos);
        }, function (err) {
            console.log("Oops! There was an error", err);
        });

    });
}



