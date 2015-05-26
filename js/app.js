var myApp = angular.module('myApp', [ 'ngRoute', 'firebase', 'appControllers' ])
.constant('FIREBASE_URL', 'https://attendanceartsir.firebaseio.com');

var appController = angular.module('appControllers', 
	['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);



myApp.config([ '$routeProvider', function($routeProvider){

	$routeProvider
	 .when('/login', {
      templateUrl: 'view/login.html',
      controller: 'RegistrationController'
    })
	 .when('/register', {
      templateUrl: 'view/register.html',
      controller: 'RegistrationController'

    })
	 .when('/meetings', {
      templateUrl: 'view/meetings.html',
      controller: 'MeetingsController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    })
	.when('/team', {
      templateUrl: 'view/team.html',
      controller: 'TeamController'

    })
	 .otherwise({
	 	redirectTo: '/login'
	 })



}]);
 