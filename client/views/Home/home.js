Template.Home.helpers({
    getCurrentPosition: function(){
        return Session.get("currentPosition");
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
            Meteor.call('logPosition', Session.get("vehicleID"), pos);
            Session.set("currentPosition", pos);

        }, function (err) {
            console.log("Oops! There was an error", err);
        });

    });
}

