app.controller('studentCtrl',  function($scope,StudentService){


	var studentlist=StudentService.liststudent();
	
	studentlist.then(function (response) {
          
 		$scope.students=response.data;
 				       //console.log(response.helpdeskData);
        });

	 $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});