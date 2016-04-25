app.controller('studentfileupload', ['$scope', 'fileUpload', function($scope, fileUpload){
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        var standard=$scope.standard;
        var section=$scope.section;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "http://localhost:3000/upload";
        fileUpload.uploadFileToUrl(file, uploadUrl,standard,section);
    };
    
}]);