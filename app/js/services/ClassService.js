app.service('ClassService', function ($http, $q) {
    var listclass = function (obj) {
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: "http://localhost:3000/listclass",
                data: obj
            }
              
            $http(req).then(function successCallback(response) {
                //console.log(response);
                defer.resolve(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                //console.log(response);
                var errorData = {
                    message: 'Some Error Occured'
                };
                defer.reject(errorData);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        return defer.promise;
    }; 
    return {
        listclass: listclass
    };
});