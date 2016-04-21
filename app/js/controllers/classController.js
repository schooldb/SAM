app.controller('classController',  function($scope,$state,TeacherService,SubjectService,SectionService,ClasssubjectassignmentService,ClassDetailService,ClassService){
listingsection();
listingclass();
$scope.sectionp = {};
$scope.listingteacher=function(){
	var teacherlist=TeacherService.listteacher();
	
	teacherlist.then(function (response) {
          
 		$scope.teachers=response.data;
 				     
        });
}
$scope.listingsubject=function(){
	var subjectlist=SubjectService.listsubject();
	
	subjectlist.then(function (response) {
          
 		$scope.subjects=response.data;
 				     
        });
}
function listingsection(){

	var sectionlist=SectionService.listsection();
	
	sectionlist.then(function (response) {
          
 		$scope.sections=response.data;
 				     
        });
}
function listingclass(){
	var subjectlist=ClassService.listclass();
	
	subjectlist.then(function (response) {
          
 		$scope.standards=response.data;
 				     
        });
}
$scope.showclassdetail=function(classID){
		
		var selected=$scope.sectionp;
		var sectionID=selected[classID].sectionID;
		var obj={
			"classID":classID,"sectionID":sectionID
		}

		$state.go("classdetail/"+classID+"/"+sectionID);
		var classdetail=ClassDetailService.classdetail(obj);
		classdetail.then(function (response) {
          
 		console.log(response.data);
 				     
        });
}


$scope.classsubjectassignment=function(){
	var classsubassignlist=ClasssubjectassignmentService.classsubjectassignment();
	
	classsubassignlist.then(function (response) {
          
 		$scope.classsubassignlist=response.data;
 				     
        });
}


	 $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});