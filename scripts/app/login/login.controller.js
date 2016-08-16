(function () {
    'use strict';

    angular.module('app').controller('loginController', LoginController);

    LoginController.$inject = ['$location']; 
    function LoginController($location) {
        var vm = this;
        vm.actions = {
            tryLogin: tryLogin
        };

        function tryLogin(){
            $location.path('/grid');
        }
    } 
})();