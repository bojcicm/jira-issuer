(function () {
    'use strict';

    app.controller('gridController', GridController);

    GridController.$inject = ['$location', '$q', 'jiraService', 'passwordService']; 
    function GridController($location, $q, jiraService, passwordService) {
        var vm = this;
        vm.actions = {
            logout: logout,
            search: search,
            updateIssues: updateIssues
        };
        vm.response = "";
        vm.isSearching = false;

        function search(){
            vm.isSearching = true; 
            jiraService.request()
                .then(function(response){
                    var test = response.data.issues;
                    test.forEach(function(issue) {
                        var date = new Date(null);
                        date.setSeconds(issue.fields.timeoriginalestimate);
                        issue.fields.timeoriginalestimate = date.toISOString().substr(11,8);
                    }, this);
                    vm.response = test;
                }, function(response){
                    logout();
                }).finally(function(){
                    vm.isSearching = false;
                });
        }

        function updateIssues(){
            vm.response.forEach(function(issue) { 
                jiraService.updateIssue(issue).then(function(response){
                    var tempDate = new Date(null);
                    tempDate.setSeconds(4*3600)
                    issue.fields.timeoriginalestimate = tempDate.toISOString().substr(11,8);
                }, function(response){
                    console.log("error has occured on " + issue.key)
                    console.log(response.body);
                });
            }, this);
        }

        function logout(){
            console.log("Logging out");
            passwordService.clearCredentials();
            $location.path('/login');
        }
    }
})();