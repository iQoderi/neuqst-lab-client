/**
 * Created by qoder on 16-6-19.
 */
angular.module('labApp')

.directive('navgationBar',navgationBar);

function navgationBar(){
    var directive={
        restrict:'AE',
        templateUrl:'components/navgationBar/index.html',
        link:function (scope) {
            
        }
    };
    
    return directive;
}