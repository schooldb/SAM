
app.controller('LoginCntrl',  function($scope,$http, $rootScope,$state,LoginService){
	//$scope.show_header=false;
		 $rootScope.show_header = false;
			$scope.loginchk=function(user){
				var data = {
				 	"email":user.email,
				    "password":user.password 
				   };

				var login=LoginService.logincheck(data);
				login.then(function (response) {
 				if(response.data.code=="1"){
 					$scope.show_header=true;
                    var userType=response.data.userType;
				 			switch (userType) {
				            case '0':
				               $state.go("schoollist");
				                break;
				            case '1':
				                $state.go("classsubjectassignment");
				                break;
			                case '2':
			                	$state.go("attendance");
			                	break;
			                case '3':
			                	$state.go("fileupload");
			                	break;
				            default:

				        }
		        }else if(response.data.code=="0"){
		           	$scope.error_msg="true";
		        }            
        });
		       
			}
	
});