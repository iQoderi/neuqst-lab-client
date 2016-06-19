/**
 * Created by qoder on 16-6-19.
 */
angular.module('labApp',['ui.router','ngResource'])
    
.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$state,$timeout,$interval,Request) {
    $scope.username='';
    $scope.password='';
    $scope.login=function () {
        if(!$scope.username||!$scope.password){
            alert('请输入用户名和密码');
        }else{
            const options={
                name:$scope.username,
                password:$scope.password
            };
            Request.login.save(JSON.stringify(options)).$promise.then(function (res) {
                if(res.code===10000){
                    if(localStorage){
                        localStorage.setItem('nequstlab.token',res.data.token);
                        $state.go('home');
                    }else{
                        alert('您的浏览器不支持localStorage，请更换浏览器或者更新您的浏览器');
                    }
                }else{
                   alert(res.data.Msg);
                }
            })
        }
    };

    $scope.handWork=function () {
        if($scope.workLink){
            var options={
                workLink:$scope.workLink
            };
            Request.handWork.save({},JSON.stringify(options))
                .$promise.then(function (res) {
                if(res.code===10000){
                    alert('提交作品成功');
                }else{
                    alert(res.data.Msg);
                }
            })
        }else{
            alert('请输入作品链接！');
        }
    };

    $scope.getWorks=function () {
        Request.works.get().$promise.then(function (res) {
            if(res.code===10000){
                $scope.works=res.data.users;
                console.log(res.data.users);
            }else{
                alert(res.data.Msg);
            }
        })
    };
     
    
    $scope.getWorks();

    $timeout(function () {
        $scope.getWorks();
    },10000);
    
    $scope.vote=function (work) {
        Request.vote.get({
            id:work._id
        }).$promise.then(function (res) {
            if(res.code===10000){
                alert('投票成功');
                $scope.getWorks();
            }else{
                alert(res.data.Msg);
            }
        });
    };
    $scope.countdown=20;
    $scope.myStyle={
        fontSize:'400px'
    };
    $scope.getResult=function () {
        var timer=$interval(function () {
            if($scope.countdown<=0){
                $scope.countdown=0;
            }
            $scope.countdown--;
        },1000);
    }
}

angular.module('labApp')
    .factory('HttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
        return {
            request: function (config) {
                config.headers['Token'] = localStorage.getItem('nequstlab.token');
                return config;
            },
            responseError: function (response) {
                if (response.status == 401 || response.status == 403) {
                    localStorage.removeItem('nequstlab.token');
                }
                return $q.reject(response);
            }
        }
    }])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('HttpInterceptor');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });