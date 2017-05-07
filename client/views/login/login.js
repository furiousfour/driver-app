Template.Login.events({
    'click .loginButton': function(event, template){
        event.preventDefault();
        var vehicleID = template.find('.vehicleNumberInput').value;
        console.log(vehicleID);
        Session.set("vehicleID", vehicleID);
        Session.set("currentPage", "Home");
        Session.set("isLoggedIn", "true");
        Session.set("currentStatus", false);
        Session.set("isOccupied", false);
    }
});