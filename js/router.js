/**
 * Created by qoder on 16-6-19.
 */
angular.module('labApp')

.config(function ($stateProvider,$httpProvider) {
    const getTemplate=function(tplPath){
        return './views/'+tplPath+'.html';
    };

    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl:getTemplate('login/login'),
            controller:mainCtrl
        })
        
        .state('home',{
            url:'/home',
            templateUrl:getTemplate('home/home'),
            controller:mainCtrl
        })
        .state('home.index',{
            url:'/index',
            templateUrl:getTemplate('home/index/index'),
            controller:mainCtrl
        })
        .state('home.vote',{
            url:'/vote',
            templateUrl:getTemplate('home/vote/vote'),
            controller:mainCtrl
        })


        .state('home.voteResult',{
            url:'/voteResult',
            templateUrl:getTemplate('home/voteResult/voteResult'),
            controller:mainCtrl
        })
        
        .state('home.handWork',{
            url:'/handWork',
            templateUrl:getTemplate('home/handWork/handWork'),
            controller:mainCtrl
        })




});