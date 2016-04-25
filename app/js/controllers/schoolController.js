app.controller('schoolCntrl',  function($scope,$rootScope,SchoolService){

 $rootScope.show_header = true;
	var schoollist=SchoolService.listschool();
	
	schoollist.then(function (response) {
          
 		$scope.schools=response.data;
 				       //console.log(response.helpdeskData);
        });

	 $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});