(function () {
    'use strict';

    app.factory('jiraService',['$http', '$q', 'passwordService', 'requestService',function($http, $q, passwordService, requestService){
        
        function searchJira(jiraQuery, numberOfIssues){
            var auth = passwordService.getCredentials();
            var options = {
                url: 'https://neogov.jira.com/rest/api/2/search',
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : auth
                },
                body: JSON.stringify({
                    //'fields': 'key,issuetype,timeoriginalestimate',
                    'jql':    jiraQuery,
                    'maxResults': numberOfIssues ? numberOfIssues : 50
                })
            }
            return requestService.executeRequest(options);
        }

        function updateIssue(issue, durationString){
            var options = {
                url: 'https://neogov.jira.com/rest/api/2/issue/' + issue.key,
                method: "PUT",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : passwordService.getCredentials(),
                    'cache-control' : 'no-cache'
                },
                body: {
                    "update":{
                        "timetracking":[{
                            "set": {"originalEstimate" : durationString}
                        }]}
                },
                json: true
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
            searchJira: function(jiraQuery, numberOfIssues){
                return searchJira(jiraQuery, numberOfIssues);
            },
            updateIssue: function(issue, durationString){
                return updateIssue(issue, durationString);
            },
            getSession: function(authPayload){
                return getSession(authPayload);
            }
        }
    }])
})()