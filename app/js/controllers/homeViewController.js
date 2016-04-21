app.controller('HomeViewCntrl', function($scope,LoginChecKUserService,$state){

	var loginchk=LoginChecKUserService.logincheck();
	loginchk.then(function (response) {
          
 				if(response.data.code=="1"){
		           $scope.tasks = [
		{
			"statement":"9.00 AM Breakfast"
		},
		{
			"statement":"10.00 AM Meeting with CTO"
		},
		{
			"statement":"12.00 PM Write proposal for CBC"
		},
		{
			"statement":"02.00 PM Lunch with Peter"
		}
	]
		           }else if(response.data.code=="0"){
		           	$state.go("login");
		           }            //console.log(response.helpdeskData);
        });
	

	
});