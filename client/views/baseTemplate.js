Template.baseTemplate.onCreated(function baseTemplateOnCreated() {
    Session.set('currentPage', 'Login');
    Session.set('isLoggedIn', false);
});

Template.baseTemplate.helpers({
    whichOne: function(){
        return Session.get("currentPage");
    },
    isLoggedIn: function(){
        return Session.get("isLoggedIn");
    }
});
