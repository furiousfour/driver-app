Template.navbar.events({
    'click .logoutButton': function(){
        Session.set("isLoggedIn", false);
        Session.set("currentPage", "Login");
    }
});

Template.navbar.helpers({
    getVehicleID : function(){
        return Session.get("vehicleID");
    }
});