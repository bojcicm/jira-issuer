(function () {
    'use strict';
    app.factory('accessService',['$q', '$http', 'passwordService', function($q, $http, passwordService){
        function login(email, password){
            var deffered = $q.defer();
            var authPayload = 'Basic ' + new Buffer(email + ":" + password).toString('base64');
            var options = {
                url: 'https://neogov.jira.com/rest/auth/1/session',
                method: "GET",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : authPayload
                }
            }
            $http(options).then(function successLogin(response){
                if(response.data = "")
                    deffered.reject();
                passwordService.saveCredentials(email, password);
                deffered.resolve();
            }, function failedLogin(response){
                console.log(response.status);
                deffered.reject();
            });
            return deffered.promise;
        }

        return {
            login : function(email, password){
                return login(email, password);
            }
        }
    }])
})()