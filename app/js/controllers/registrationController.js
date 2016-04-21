app.controller('registerCntrl',  function($scope,RegistrationService){
	$scope.addschool=function(school){
		alert("F");
		console.log(school);
      var result=RegistrationService.addschool(school);
	};
});