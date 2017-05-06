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
        Meteor.call('startTrip', VStatus.find({vehicleID: Session.get("vehicleID")}));
        Session.set("currentStatus", true);
    }
});