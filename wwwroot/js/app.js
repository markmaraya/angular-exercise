'use strict';

(function () {
	angular.module('DirectorySearchApplication', ['ngRoute', 'templates']);

	angular
		.module('DirectorySearchApplication')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'main.html',
					controller: 'DirectorySearchController',
					controllerAs: 'DirectorySearch'
				})
				.when('/detail/:index', {
					templateUrl: 'detail.html',
					controller: 'DetailsController',
					controllerAs: 'Details'
				})
				.otherwise({
					templateUrl: "error.html"
				});
		}]);
})();
'use strict';

(function () {
    angular
        .module('DirectorySearchApplication')
        .service('ArtistService', ['$http', function ($http) {
            this.getArtistDetails = function () {
                return $http.get('data/artist-data.json');
            };
        }]);
})();
'use strict';

(function () {
	angular
		.module('DirectorySearchApplication')
		.controller('DirectorySearchController', ['$scope', 'ArtistService', function ($scope, ArtistService) {
			$scope.searchOptions = ['name', 'reknown'];
			$scope.searchBy = 'name';
			$scope.direction = '';

			$scope.order1 = 'active';

			$scope.orderByFunction = function (x) {
				$scope.direction = x;
				if (x == 'reverse') {
					$scope.order1 = '';
					$scope.order2 = 'active';
				} else {
					$scope.order1 = 'active';
					$scope.order2 = '';
				}
			};

			$scope.toggleButtonLabel = 'show filter';
			$scope.filterHide = 'filter-hide';

			$scope.toggleFilter = function () {
				if ($scope.toggleButtonLabel == 'show filter') {
					$scope.filterHide = '';
					$scope.toggleButtonLabel = 'hide filter';
				} else {
					$scope.filterHide = 'filter-hide';
					$scope.toggleButtonLabel = 'show filter';
				}
			};

			$scope.artists = [];
			ArtistService.getArtistDetails()
				.then(function (response) {
					$scope.artists = response.data;
				});
		}]);
})();
'use strict';

(function () {
	angular
		.module('DirectorySearchApplication')
		.controller('DetailsController', ['$scope', '$routeParams', 'ArtistService', function ($scope, $routeParams, ArtistService) {
			$scope.index = parseInt($routeParams.index);

			$scope.prevFunction = function (x) {
				if ($scope.index == 0) {
					$scope.index = x - 1;
				} else {
					$scope.index = $scope.index - 1;
				}
			};

			$scope.nextFunction = function (x) {
				if ($scope.index == x - 1) {
					$scope.index = 0;
				} else {
					$scope.index = $scope.index + 1;
				}
			};

			$scope.artists = [];
			ArtistService.getArtistDetails()
				.then(function (response) {
					$scope.artists = response.data;
				});
		}]);
})();
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