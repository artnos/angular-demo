myApp.controller('TeamController', 
  function($scope, $location, $http) {

      $http.get('js/data/data.json').success(function(data) {

        $scope.artists = data;
        $scope.artistOrder = 'name';
        $scope.sucess = 'sucess'

      });

 



  }); //RegistrationController




