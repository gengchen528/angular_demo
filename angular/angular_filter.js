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
});
// 去除重复数据接口
// @ keyname:需要去重的项，字符接收注意在页面上使用 例： unique:'type'
// @ collection: 数据对象
myMoudle.filter('unique',function () {
    return function (collection,keyname) {
        var output=[],keys=[];
        angular.forEach(collection,function (item) {
            var key = item[keyname];
            if(keys.indexOf(key)===-1){//对比是否多次存在，如果不存在就加入数组，代表唯一存在
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    }
})