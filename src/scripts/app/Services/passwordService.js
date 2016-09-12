(function () {
    'use strict';
    var storage = require('electron-json-storage');

    app.factory('passwordService',['$q', function($q){
        var self = this;
        self.auth = "";
        self.username = "";

        function saveCredentials(email, password, username){
            self.username = username;
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

        function getCredentials(){
            storage.get('auth', function(error, data){
                    if(error) throw error;
                    self.auth = data.auth;    
                });
                return self.auth;
        }

        function getUserName(){
            return self.username;
        }

        return {
            saveCredentials : function(email, password, username){
                return saveCredentials(email, password, username);
            },
            getCredentials : getCredentials,
            getUserName : getUserName,
            clearCredentials: clearCredentials
        }
    }])
})()