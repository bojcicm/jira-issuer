(function () {
    'use strict';
    var request = require('request');

    app.factory('requestService',['$q', function($q){
        
        function executeRequest(options){
            var deffered = $q.defer();
            if(!options){
                deffered.reject('No options defined');
                return deffered.promise;
            }
            request(options, function(error, response, body){
                deffered.resolve(response);
            });
            return deffered.promise;
        }

        return {
            executeRequest : function(options){
                return executeRequest(options);
            }
        }
    }])
})()