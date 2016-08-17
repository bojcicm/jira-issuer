(function () {
    'use strict';
    var request = require('request');

    app.factory('jiraService',['$http', '$q', 'passwordService', 'requestService',function($http, $q, passwordService, requestService){
        
        function searchJira(jiraQuery){
            var options = {
                url: 'https://neogov.jira.com/rest/api/2/search',
                method: "GET",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : passwordService.getCredentials()
                },
                params: JSON.stringify({
                    fields: "key,issuetype,timeoriginalestimate",
                    jql:    jiraQuery
                })
            }
            return requestService.executeRequest(options);
        }

        function updateIssue(issue){
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
            return requestService.executeRequest(options);
        }

        function getSession(authPayload){
            var options = {
                url: 'https://neogov.jira.com/rest/auth/1/session',
                method: "GET",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : authPayload
                }
            }
            return requestService.executeRequest(options);
        }

        return {
            searchJira: function(jiraQuery){
                return searchJira(jiraQuery);
            },
            updateIssue: function(issue){
                return updateIssue(issue);
            },
            getSession: function(authPayload){
                return getSession(authPayload);
            }
        }
    }])
})()