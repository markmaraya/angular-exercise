'use strict';

(function () {
    angular
        .module('DirectorySearchApplication')
        .directive('artistCard', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    artists: '=',
                    artist: '='
                },
                template: '<a href="#detail/{{artists.indexOf(artist)}}"><div><img src="../images/{{artist.shortname}}_tn.jpg"></div><div id="resultName"><p>{{artist.name}}</p><p>{{artist.reknown}}</p></div></a>',
            };
        }]);
})();

(function () {
    angular
        .module('DirectorySearchApplication')
        .directive('artistSearchList', [function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    artists: '=',
                    search: '=',
                    searchBy: '=',
                    direction: '='
                },
                template: '<div ng-show="search" class="result" ng-repeat="artist in artists | filter : {name : search} | orderBy : searchBy:direction"><artist-card artists="artists" artist="artist"></artist-card></div>',
            };
        }]);
})();