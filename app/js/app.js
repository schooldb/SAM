//var app = angular.module('myapp',['ui.router']);
var app=angular.module('myapp', ['ui.router','angularUtils.directives.dirPagination'])

app.config(['$stateProvider','$httpProvider', '$urlRouterProvider',function($stateProvider,$httpProvider,$urlRouterProvider){

    $stateProvider.state('login', {
        url:'/login',
        templateUrl:'templates/login.tpl.html',
        controller: 'AnotherCntrl'
    })
   


    .state('home', {
        url:'/home',
        templateUrl:'templates/home.tpl.html',
        controller: 'HomeViewCntrl'
    })
    

    .state('tasks', {
        url:'/tasks',
        templateUrl:'templates/tasks.tpl.html',
        controller: 'TasksCntrl'
    })


    .state('fileupload', {
        url:'/fileupload',
        templateUrl:'templates/fileupload.tpl.html',
        controller: 'myCtrl'
    })
 

    .state('studentlist', {
        url:'/studentlist',
        templateUrl:'templates/studentlist.tpl.html',
        controller: 'studentCtrl'
    })


    .state('registration', {
        url:'/registration',
        templateUrl:'templates/register.tpl.html',
        controller: 'registerCntrl'
    })


       .state('schoollist', {
        url:'/schoollist',
        templateUrl:'templates/schoollist.tpl.html',
        controller: 'schoolCntrl'
      })


        .state('class', {
        url:'/class',
        templateUrl:'templates/class.tpl.html',
        controller: 'classController'
      })
   .state('classdetail', {
        url:'/classdetail/:classID/:sectionID',
        templateUrl:'templates/classdetail.tpl.html',
        controller: 'classDetailController'
      })
   .state('attendance', {
        url:'/attendance',
        templateUrl:'templates/attendance.tpl.html',
        controller: 'attendanceController'
      })
    
}])

