app.controller('TasksCntrl',  function($scope,EmployeeService){
	$scope.newTask = "";
	$scope.tasks = [];
	$scope.addNewTask = function(){
		$scope.tasks.push({name:$scope.newTask});
	}

	$scope.task = {
		name:"Random Task"
	};

	$scope.addemployee=function(user){
		console.log(user);
      var result=EmployeeService.addemployee(user);
	}
});