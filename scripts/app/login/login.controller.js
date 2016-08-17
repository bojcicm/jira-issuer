(function () {
    'use strict';

    app.controller('loginController', LoginController);

    LoginController.$inject = ['$location', 'accessService']; 
    function LoginController($location, accessService) {
        var vm = this;
        vm.isBusy = false;
        vm.failedLogin = false;

        vm.actions = {
            tryLogin: tryLogin
        };

        function tryLogin(){
            vm.isBusy = true;
            accessService.login(vm.email, vm.password)
                .then(goToGrid, showMessageIfFailed)
                .finally(function(){
                    vm.isBusy = false;
                })
        }

        function goToGrid(){
            vm.failedLogin = false;
            $location.path('/grid');
        }

        function showMessageIfFailed(){
            vm.failedLogin = true;
        }
        function closeFailedLoginMessage(){
            vm.failedLogin = false;
        }


    } 
})();