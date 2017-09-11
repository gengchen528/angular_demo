var myMoudle = angular.module('myModule',[]);
myMoudle.controller('filter',function ($scope,$http) {
    $http({method:'get',url:'../json/data.json',headers: {}}).success(function (data) {
        if( data.code == 1){
            $scope.dataList = data.data.list;
            $scope.filterType='';
            $scope.filterPrice;
            $scope.showType=function (type) {
                $scope.filterType=type;
            };
            $scope.showPrice=function (price) {
                $scope.filterPrice=price;
            }
        }
    })
});
myMoudle.filter('filter1',function () {
    return function (data,Type,Price) {
        var result=[];
        angular.forEach(data,function (item) {
            //价格与类型同时选择
            if(Price&&Type){
                    if(item.type===Type && item.price >Price){
                        result.push(item);
                    }
            } else if(Price || Type){//价格类型选择一种
                if(item.type===Type || item.price > Price){
                    result.push(item);
                }
            } else {//价格类型都不选择
                result.push(item);
            }
        });
        return result;
    }
})