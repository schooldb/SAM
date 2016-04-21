app.controller('HelloWorldCntrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.testMessage = "Hello World!!!";

	$scope.employees = [
		{
			"name": "John Clark",
			"designation": "I. T. Manager"
		},
		{
			"name": "Gracy C. Angle",
			"designation": "Sales Executive"
		},
		{
			"name": "Mike Preria",
			"designation": "Marketing Head"
		}
	];

	$rootScope.employees = $scope.employees;
}])