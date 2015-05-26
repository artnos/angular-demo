myApp.controller('MeetingsController',
  function($scope, $firebaseObject) {


  var ref = new Firebase("https://attendanceartsir.firebaseio.com/meetings");
  var meetings = $firebaseObject(ref);


  $scope.meetings = meetings;
  //data for the view 
  //the view is determine by the app.js

  $scope.test = 'Label';

  //console.log(meetings)

  $scope.addMeeting = function(){

  	ref.push({ 
  		'name': $scope.meetingname, 
  		'date': Firebase.ServerValue.TIMESTAMP })
  	.then(function(){
  		$scope.meetingname = '';

  	})

  }; //end of add meeting


  var deleteRef
  $scope.deleteMeeting = function(key) {
    //meetings.$remove(key);

    deleteRef = new Firebase('https://attendanceartsir.firebaseio.com/meetings/' + key);
    deleteRef.remove()
  }; //deleteMeeting





   



}); //MeetingsController


