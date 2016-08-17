(function () {
    'use strict';
    app.factory('passwordService',[function(){
        var self = this;
        self.auth = "";

        function saveCredentials(email, password){
            var base64 = new Buffer(email + ":" + password).toString('base64');
            self.auth = 'Basic ' + base64;
        }

        function clearCredentials(){
            self.auth = ""
        }

        return {
            saveCredentials : function(email, password){
                return saveCredentials(email, password);
            },
            getCredentials : function(){
                return self.auth;
            },
            clearCredentials: clearCredentials
        }
    }])
})()