(function() {
    'use strict'; 

    angular.module('app').run(GoToLoginState); 

    GoToLoginState.$inject = ['$state'];
    function GoToLoginState($state) {
        $state.go('login', { location: false });
        console.log($state);
    }
})();