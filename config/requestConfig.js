/**
 * Created by qoder on 16-6-19.
 */
angular.module('labApp')

.factory('Request',requestConfig);

function requestConfig($resource) {
    return {
        login:$resource(apiHost+'/users/login',{},{
           save:{
               method:'POST',
               isArray:false
           }
        }),
        handWork:$resource(apiHost+'/users/handWork',{},{
            save:{
                method:'POST',
                isArray:false
            }
        }),
        works:$resource(apiHost+'/users/works'),
        vote:$resource(apiHost+'/users/vote')
    }
}
