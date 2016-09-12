(function() {
    'use strict'; 

    app.run(GoToLoginState); 

    GoToLoginState.$inject = ['$state', 'passwordService'];
    function GoToLoginState($state, passwordService) {
        passwordService.clearCredentials();
        $state.go('login', { location: false });
    }
})();