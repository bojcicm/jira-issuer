(function () {
    'use strict';

    app.config(HomeStateConfig);

    HomeStateConfig.$inject = ['$stateProvider'];
    function HomeStateConfig($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                'content@': {
                    templateUrl:  './scripts/app/login/login.template.html',
                    controller:   'loginController',
                    controllerAs: 'vm'
                },
                'header@':{
                    templateUrl: './scripts/app/login/login.header.html'
                }
            }
        });
    }
})();