(function () {
    'use strict';

    angular.module('app').controller('gridController', GridController);

    GridController.$inject = ['$location']; 
    function GridController($location) {
        var vm = this;
        vm.actions = {
            logout: logout
        };

        function logout(){
            $location.path('/login');
        }
    } 
})();