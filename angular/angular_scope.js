// 独立scope
//scope 绑定策略
//@:把当前属性作为字符串传递，你还可以绑定来自外层scope的值，在属性值中插入{{}}即可
//=：与父scope中的属性进行双向绑定
//&：传递一个来自于父scope的函数，稍后调用
var myModule = angular.module('myModule',[]);
myModule.controller('myCtrl',['$scope',function ($scope) {
    $scope.ctrlFlavor='rio鸡尾酒';
    $scope.sayHello=function (name) {
        alert('hello'+name)
    }
}])
myModule.directive('hello',function () {
    return {
        restrict:'AE',
        scope:{},// 有这个标记就为独立作用域
        template:'<div><input type="text" ng-model="username"> {{username}}</div>'
    }
});
//直接获取外部scope
myModule.directive('drink',function () {
    return {
        restrict:'AE',
        scope:{
          flavor:'@'//获取外部scope的变量值
        },
        template:'<div>{{flavor}}</div>'
        // link:function (scope,element,attrs) {
        //     scope.flavor=attrs.flavor
        // }
    }
});
//双向绑定
myModule.directive('bang',function () {
    return {
        restrict:'AE',
        scope:{
            flavor:'='//页面调用无需{{}}，只需要flavor='ctrlFlavor'
        },
        template:'<input type="text" ng-model="flavor"/>'
    }
});
//指令获取外部获取方法，scope使用&模式
myModule.directive('greeting',function () {
    return {
        restrict: 'AE',
        scope:{
            greet:'&'
        },
        template:'<input type="text" ng-model="userName"/><br>'+'<button ng-click="greet({name:userName})">Greet</button><br>'

    }
})