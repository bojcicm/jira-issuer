(function () {
    'use strict';
    var request = require('request');

    app.factory('jiraService',['$http', '$q', 'passwordService',function($http, $q, passwordService){
        
        function searchJira(){
            var options = {
                url: 'https://neogov.jira.com/rest/api/2/search',
                method: "GET",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : passwordService.getCredentials()
                },
                params: {
                    fields: "key,issuetype,timeoriginalestimate",
                    jql:"project=ROLL and Status = \"Ready for Dev\""
                }
            }
            return $http(options);
        }

        function updateIssue(issue){
            var deffered = $q.defer();
            var options = {
                url: 'https://neogov.jira.com/rest/api/2/issue/' + issue.key,
                method: "PUT",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : passwordService.getCredentials(),
                    'cache-control' : 'no-cache'
                },
                body: JSON.stringify({
                    "update":{
                        "timetracking":[{
                            "set": {"originalEstimate" : "2h"}
                        }]}
                })
            }
            request(options, function(error, response, body){
                if(response.statusCode != 204){
                    deffered.reject(response);
                }
                else{
                    deffered.resolve(response);
                }
            })
            return deffered.promise;
        }

        return {
            request: function(){
                return searchJira();
            },
            updateIssue: function(issue){
                return updateIssue(issue);
            }
        }
    }])
})()