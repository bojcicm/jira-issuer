(function () {
    'use strict';
    var storage = require('electron-json-storage');

    app.factory('passwordService',[function(){
        var self = this;
        self.auth = "";

        function saveCredentials(email, password){
            var base64 = new Buffer(email + ":" + password).toString('base64');
            storage.has('auth', function(error, hasKey){
                if(hasKey){
                    storage.clear(function(error){
                        if(error) throw error;
                    });
                }
            });
            storage.set('auth', {auth : "Basic " + base64}, function(error){
                if(error) throw error;
                else self.auth = "Basic " + base64;
            })
        }

        function clearCredentials(){
            storage.clear(function(error){
                if(error) throw error;
            });
            self.auth = "";
        }

        return {
            saveCredentials : function(email, password){
                return saveCredentials(email, password);
            },
            getCredentials : function(){
                storage.get('auth', function(error, data){
                    if(error) throw error;
                    self.auth = data.auth;    
                });
                return self.auth;
            },
            clearCredentials: clearCredentials
        }
    }])
})()