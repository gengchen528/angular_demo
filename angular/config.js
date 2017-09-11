var myModule = angular.module('myModule',[]);

myModule.controller('myCtrl',['$scope',function ($scope) {
    $scope.loadData = function () {
        console.log('数据正在加载。。。。');
    }
}]);
myModule.controller('myCtrl2',['$scope',function ($scope) {
    $scope.loadData2 = function () {
        console.log('数据第二个正在加载。。。。');
    }
}]);
myModule.directive('loader',function () {
    return{
        restrict:'AE',
        link:function (scope,element,attrs) {
            element.bind('mouseenter',function () {
               // scope.loadData();
                scope.$apply(attrs.howtoload)
            });
        }
    }
})