(function() {
    'use strict'; 

    app.config(AppConfig); 

    AppConfig.$inject = ['$locationProvider', '$urlRouterProvider']; 
    function AppConfig($locationProvider, $urlRouterProvider) {        
        $locationProvider.html5Mode(false); 

        $urlRouterProvider.otherwise(function($injector, $location){
            var state = $injector.get('$state');
            state.go('login');
            return $location.path();
        });
    }
})();
