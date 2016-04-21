
app.controller('AnotherCntrl',  function($scope,$http,$state,$rootScope,LoginService){
	
		load_pictures();
	function load_pictures(){
				
					$http.get('http://localhost:3000/load').success(function(data){
					$scope.employees=data;
					console.log(data);
			});
			};
			$scope.loginchk=function(user){
				var data = {
				 	"email":user.email,
				    "password":user.password 
				   };
				var login=LoginService.logincheck(data);
				login.then(function (response) {
          
 				if(response.data.code=="1"){
		           	$state.go("home");
		           }else if(response.data.code=="0"){
		           	$scope.error_msg="true";
		           }            //console.log(response.helpdeskData);
        });
		       /*$http.post("http://localhost:3000/loginch1k", data).success(function(data, status) {
		           if(data.code=="1"){
		           	$state.go("home");
		           }else if(data.code=="0"){
		           	$scope.error_msg="true";
		           }
		        });*/
			}
	/*$scope.addNewEmployee = function(){
		console.log("Do you have employees here", $rootScope.employees);
		if ($scope.newEmployee.name.length > 0 && $scope.newEmployee.designation.length > 0){
			var newEmployee = angular.copy($scope.newEmployee);
			$scope.newEmployee.name="";
			$scope.newEmployee.designation = "";
			$rootScope.employees.push(newEmployee);
		}
	}*/
});