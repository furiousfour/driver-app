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
        Location.startWatching(function (pos) {
            console.log("Got a position in phone!", pos);
            Meteor.call('logPosition', Session.get("vehicleID"), Session.get("isOccupied"), pos);
            console.log("Sending : " +
                "VehicleID" + Session.get("vehicleID") +
                "latitude" + pos.latitude +
                "longitude" + pos.longitude +
                "isOccupied" + Session.get("currentStatus")
            );
            Session.set("currentPosition", pos);
        }, function (err) {
            console.log("Oops! There was an error", err);
        });

    });
}

