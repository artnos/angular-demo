myApp.controller('RegistrationController', 
  function($scope, $location, $firebaseAuth,  Authentication) {


  	/*
  	$scope.name = 'Test';

  	$scope.$on('$viewContentLoaded', function(){
  		console.log($scope.myform);
  	});
	*/
    var ref = new Firebase("https://attendanceartsir.firebaseio.com");
    var auth = $firebaseAuth(ref);
      //console.log($scope.user.email + ' ' $scope.user.password);

  	$scope.login = function(){
  		//alert($scope.user.email);
  		//$location.path('/meetings');

      Authentication.login($scope.user)
      .then(function(user) {

        $location.path('/meetings');
        console.log('log in sucess');

      })
      .catch(function(error) {

        $scope.message = error.message;

      });

  	};


  	$scope.register = function() {
      Authentication.register($scope.user)
        .then(function(user) {
          Authentication.login($scope.user);
          $location.path('/meetings');
        }).catch(function(error) {
          $scope.message = error.message;
        });
    }; //register



  }); //RegistrationController




