var myApp = angular.module('myApp',[]);
myApp.controller('ctrl',function ($scope,$http) {
    var req = {
        method:"get",
        url:'./json/data.json',
        headers:""
    }
    $http(req).success(function (response) {
        if(response.head.code === 0){
            $scope.data = response.data;
        }
    })
})