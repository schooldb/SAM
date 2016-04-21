app.controller('attendanceController',  function($scope,SchoolService,SubjectService,SectionService,ClassService,StudentService){
	listingsection();
listingclass();
listingsubject();
$scope.attendanceStatus="P";
 $scope.newObject = {};
  $scope.items = [{name:'foo'}, {name:'bar'}, {name:'baz'}];
//$scope.valuefs = {};
function listingsubject(){
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

$scope.selectstudents=function() {

	var obj={"sectionID":$scope.sect.sectionID,"standardID":$scope.stand.classID};

	//StudentService.liststudent(obj);
	var studentlist=StudentService.liststudent(obj);
	
	studentlist.then(function (response) {
       
 		$scope.students=response.data;
 		   //$scope.newObject=true;
 				       //console.log(response.helpdeskData);
        });

	 $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }


}


$scope.changeStatus=function(studentID){
	alert(studentID);
 
console.log($scope.newObject);

}
$scope.save=function(){
	console.log($scope.newObject);
	console.log($scope.sect.sectionID);
	console.log($scope.stand.classID);
	console.log($scope.sub.subjectID);

}
});