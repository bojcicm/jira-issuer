(function() {
    'use strict'; 

    app.run(GoToLoginState); 

    GoToLoginState.$inject = ['$state'];
    function GoToLoginState($state) {
        $state.go('login', { location: false });
    }
})();