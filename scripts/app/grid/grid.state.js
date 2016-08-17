(function () {
    'use strict';

    app.config(HomeStateConfig);

    HomeStateConfig.$inject = ['$stateProvider'];
    function HomeStateConfig($stateProvider) {
        $stateProvider.state('grid', {
            url: '/grid',
            views: {
                'content@': {
                    templateUrl:  './scripts/app/grid/grid.template.html',
                    controller:   'gridController',
                    controllerAs: 'vm'
                },
                'header@':{
                    templateUrl:'./scripts/app/grid/grid.header.html',
                    controller: 'gridController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();