(function () {
    'use strict';
    app.factory('accessService',['$q', '$http', 'passwordService', 'jiraService', function($q, $http, passwordService, jiraService){
        function login(email, password){
            var deffered = $q.defer();
            var authPayload = 'Basic ' + new Buffer(email + ":" + password).toString('base64');
            
            jiraService.getSession(authPayload).then(successLogin, failedLogin);
            return deffered.promise;

            function successLogin(response){
                if(response.body != "" && response.statusCode != 401){
                    passwordService.saveCredentials(email, password);
                    deffered.resolve();
                }else{
                    console.log(response.statusMessage);
                    deffered.reject();
                }
            }
            function failedLogin(response){
                deffered.reject();
                console.log(response.statusMessage);
            }

        }

        return {
            login : function(email, password){
                return login(email, password);
            }
        }
    }])
})()