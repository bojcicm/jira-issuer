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
        vm.issueStatus = {
            loaded : 0,
            updating: 1,
            updated: 2,
            error: 3
        };
        vm.response = "";
        vm.jqlQuery = "";
        vm.isSearching = false;
        vm.username = "";
        vm.durationString = "";

        init();

        function init(){
            var username = passwordService.getUserName();
            if(username == "") logout();
            else vm.username = username;
        }

        function search(){
            if(vm.jqlQuery == "") return;
            
            vm.isSearching = true;
            jiraService.searchJira(vm.jqlQuery)
                .then(function(response){
                    if(response.statusCode === 401)
                        logout();
                        //return;
                    else if(response.statusCode === 400){
                        console.log(response.body);
                        vm.isSearching = false;
                    }
                    else if(!areAllResponsesPresent(response.body)){
                        jiraService.searchJira(vm.jqlQuery, JSON.parse(response.body).total + 1).then(function(response){
                            parseResponse(response);
                        })
                    }
                    else{
                        parseResponse(response);
                    }
                }).finally(function(){
                });
            
            function parseResponse(response){
                var foundIssues= JSON.parse(response.body).issues;
                        foundIssues.forEach(function(issue) {
                            var date = new Date(null);
                            date.setSeconds(issue.fields.timeoriginalestimate);
                            issue.fields.timeoriginalestimate = date.toISOString().substr(11,8);
                            issue.gridDisplayStatus = vm.issueStatus.loaded;
                        }, this);
                vm.response = foundIssues;
                vm.isSearching = false;
            }

            function areAllResponsesPresent(response){
                var parsedResponse = JSON.parse(response);
                if(parsedResponse.maxResults < parsedResponse.total)
                    return false;
                return true;
            }
        }

        function updateIssues(){
            if(!vm.durationString && vm.durationString == "") return;

            vm.response.forEach(function(issue) { 
                issue.gridDisplayStatus = vm.issueStatus.updating;
                jiraService.updateIssue(issue, vm.durationString).then(function(response){
                    if(response.statusCode == 400){
                        issue.gridDisplayStatus = vm.issueStatus.error;
                        console.log("error has occured on " + issue.key)
                        console.log(response.body);
                    }
                    else{
                        var date = new Date(null);
                        date.setMilliseconds(vm.ms(vm.durationString));
                        issue.fields.timeoriginalestimate = date.toISOString().substr(11,8);
                        issue.gridDisplayStatus = vm.issueStatus.updated;
                    }
                });
            }, this);
        }

        function logout(){
            passwordService.clearCredentials();
            $location.path('/login');
        }

        vm.ms = (function () {
            'use strict';

            var second = 1000,
                minute = second*60,
                hour   = minute*60,
                day    = hour*24,
                week   = day*7,
                //year   = second*3.154e7,// According to Wolfram|Alpha
                //month  = ~~(year/12),   // ~~ == parseInt
                typeOf,
                parse;

            typeOf = (function ( classNames ) {
                // a better typeof

                var className, i, classTypeMap;

                classNames = classNames.replace(/\s+/g, ' ').split(' ');
                i = classNames.length;
                classTypeMap = {};

                while ( ( className = classNames[--i] ) ) {
                    classTypeMap[ '[object ' + className + ']' ] = className.toLowerCase();
                }

                return function ( o ) {
                    if ( 0 === arguments.length ) {
                        o = this;
                    }

                    return null == o ? o + '' : classTypeMap[Object.prototype.toString.call( o )] || 'object';
                };
            } ('Date Number String'));// Arguments Array Boolean Date Function Number RegExp String

            parse = (function () {
                var re = /(\d+)(d|h|m|s|ms)/g,
                    fn = {
                        'w': function ( i ) {
                            return i * week;
                        },
                        'd': function ( i ) {
                            return i * day;
                        },
                        'h' : function ( i ) {
                            return i * hour;
                        },
                        'm' : function ( i ) {
                            return i * minute;
                        },
                        's' : function ( i ) {
                            return i * second;
                        },
                        'ms' : function ( i ) {
                            return 1 * i;
                        }
                    };

                return function ( s ) {
                    var ms = Date.parse( s ),
                        match, value, unit;

                    if ( isNaN(ms) ) {
                        s = s.replace(/\s+/g, '');
                        ms = 0;
                        while ( null != (match = re.exec(s)) ) {
                            value = match[1];
                            unit = match[2];
                            ms += fn[unit] && ~~fn[unit]( value );// ~~ == parseInt
                        }
                    }

                    return ms;
                };
            } ());

            return function ( o ) {
                var ms;

                // o could be of type Date, Number or String
                // String can be either something that is parsable by Date.parse OR a string with SI units and non-SI
                // units accepted for use with the SI, see http://en.wikipedia.org/wiki/Non-SI_units_mentioned_in_the_SI
                //
                // e.g. '1h 30min 30s' == 1 hour, 30 minutes and 30 seconds
                // whitespace is not required -> '1h30min30s' also works

                //o = new Date(2012, 0, 23, 15, 20, 0, 0);

                switch ( typeOf(o) ) {
                    case 'string':
                        ms = parse( o );
                        break;
                    case 'date':
                        ms = o - new Date();
                        break;
                    case 'number':
                        ms = o;
                        break;
                    default:
                        // throw 'Not valid input';
                }

                return Math.max(0, ms);
            };
        } ());
    }
})();