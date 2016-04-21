app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl,standard,section){
        var fd = new FormData();
        fd.append('file', file);
     var data={
        'standard':standard,
        'section':section,
        
     };
     fd.append('data',angular.toJson(data));
        $http.post(uploadUrl, fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);