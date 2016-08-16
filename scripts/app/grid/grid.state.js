(function () {
    'use strict';

    angular.module('app').config(HomeStateConfig);

    HomeStateConfig.$inject = ['$stateProvider'];
    function HomeStateConfig($stateProvider) {
        $stateProvider.state('grid', {
            url: '/grid',
            views: {
                'content@': {
                    templateUrl:  './scripts/app/grid/grid.template.html',
                    controller:   'gridController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();