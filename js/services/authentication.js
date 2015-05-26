myApp.factory('Authentication', function($firebase, 
  $firebaseAuth, $firebaseObject, $rootScope, $routeParams, $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

   auth.$onAuth(function(authUser) {

    if (authUser) {
      var user = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
      var u = $firebaseObject(user);
      console.log('authUser.uid: ' +  authUser.uid )
      console.log(u)
      $rootScope.currentUser = u;
    } else {
      $rootScope.currentUser = '';
    }

  });
  //Temporary object
  var firebaseUsers = new Firebase(FIREBASE_URL + '/users');

  var myObject = {

    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      }); //authWithPassword
    }, //login

    logout: function(user) {
      return auth.$unauth();
    }, //login

    /**/
    register: function(user) {
       return auth.$createUser({
        email: user.email,
        password: user.password
      })
      .then(function(regUser){

      	//console.log(regUser)
      	//need to set regUser.uid as name
      	firebaseUsers.child(regUser.uid).set(  {

      		'date '		: Firebase.ServerValue.TIMESTAMP,
      		'regUser' 	: regUser.uid,
      		'firstname'	: user.firstname,
      		'lastname'	: user.lastname,
      		'email'      : user.email
    
      	});
      }); 

	 }, //end of register
    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication

    waitForAuth: function() {
      return auth.$waitForAuth();
    } //Wait until user is Authenticated


   


   }; //myObject
  return myObject;
}); //myApp Factory

