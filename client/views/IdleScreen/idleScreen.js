Template.idleScreen.helpers({
    requestForTrip: function(){
        var returnObject = {available: false};
        if(VStatus.find({vehicleID: Session.get("vehicleID")}).count()>0)
            returnObject = {available: true, data: VStatus.findOne({vehicleID: Session.get("vehicleID")})};
        return returnObject;
    }
});

Template.idleScreen.events({
    'click .startButton': function(event){
        event.preventDefault();
        Session.set("currentStatus", true);
        Session.set('isOccupied', true);
        Meteor.call('startTrip', VStatus.findOne({vehicleID: Session.get("vehicleID")}));
    }
});