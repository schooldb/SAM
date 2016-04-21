app.controller('classDetailController',  function($scope,$state,$stateParams ,TeacherService,ClassDetailService){
var obj={
			"classID":$stateParams.classID,"sectionID":$stateParams.sectionID
		}
var classdetail=ClassDetailService.classdetail(obj);
		classdetail.then(function (response) {
          $scope.classDetails=response.data;
 		//console.log(response.data);
 				     
        });
});