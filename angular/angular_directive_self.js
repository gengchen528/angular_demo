var myModule = angular.module('myModule',[]);
myModule.controller('select',function ($scope) {

    $scope.nameMap ={
        'allVisitor':'历史上所有访问过网站的用户总量',
        'allRegister':'历史上所有活跃过的注册用户总量',
        'allBuyer':'历史上所有完成过订单的买家总量',
        'newVisitor':'内新增的访问网站的用户总量',
        'newRegister':'本月内新增注册的用户总量',
        'newBuyer':'本月内新增的买家总量',
        'visitor':'本月内所有访问过网站的用户总量',
        'register':'本月内完成注册的用户总量',
        'buyer':'本月内所有完成过订单的买家总量'
    };

})
myModule.controller('myCtrl',function ($scope) {
    $scope.title = '点击打开';
    $scope.text = '这是打开后的内容';
});
myModule.controller('myCtrl2',['$scope',function ($scope) {
    $scope.num=this.num;
    $scope.count=this.count;
    $scope.double = function () {
        return  this.count=this.num*2
    }
}]);
myModule.controller('myClick',['$scope',function ($scope) {
    $scope.saveTip=function () {
        return '<div>hello</div>>'
    }
}]);
myModule.directive('expander',function () {
    return {
        restrict:'AE',
        repalce:true,
        transclude:true,
        scope:{
            title:'=expanderTitle'
        },
        template:'<div>'
                +'<div class="title" ng-click="toggle()" style="border: 1px solid red;background-color:rosybrown">{{title}}</div>'
                +'<div class="body" ng-show="showMe" ng-transclude></div>'
                +'</div>',
        link:function (scope,element,attrs) {
            scope.showMe = false;
            scope.toggle = function () {
                scope.showMe = !scope.showMe;
            }
        }
    }
});
