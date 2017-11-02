var myApp = angular.module('myApp',[])

myApp.controller('myCtrl',['$window','$scope',function ($window,$scope) {
    $scope.user=[
        {"id":1,"name":"li"},
        {"id":2,"name":"bai"},
        {"id":3,"name":"ce"},
        {"id":4,"name":"shi"}
    ];
    $scope.sayHello=function (name) {
        alert('hello'+name)
    };

    $scope.chose=function (ids,name) {
        $('#'+ids).attr("disabled","true");
    };
}])
//创建指令代表创建一个标签，也可理解为一个简单的模板
myApp.directive('super',function () {
    return {
        scope:{},
        restrict:'AE',
        //给指令中添加控制器，可以暴露给外部使用
        controller:function ($scope) {
            $scope.abilities = [];
            this.addStrength = function () {
                $scope.abilities.push("strength");
            };
            this.addSpeed = function () {
                $scope.abilities.push("speed");
            };
            this.addLight = function () {
                $scope.abilities.push("light");
            };
        },
        // 类似于给此标签添加的事件或者类型样式等
        link:function (scope,element,attrs) {
            element.addClass('super');
            element.bind('mouseenter',function () {
                console.log(scope.abilities)
            });
        }
    }
});
myApp.directive('strength',function () {
    return {
        require: '^super',
        link: function (scope,element,attrs,superCtrl) {
            superCtrl.addStrength();
        }
    }
});
myApp.directive('speed',function () {
    return {
        require: '^super',
        link: function (scope,element,attrs,superCtrl) {
            superCtrl.addSpeed();
        }
    }
});
myApp.directive('light',function () {
    return {
        require: '^super',
        link: function (scope,element,attrs,superCtrl) {
            superCtrl.addLight();
        }
    }
});
