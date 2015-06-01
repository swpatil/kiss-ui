var kissApp = angular.module('kissApp', [ 'ui.router', 'smart-table',
		'angularTreeview', 'ui.bootstrap', 'cfp.hotkeys',
		'pascalprecht.translate', 'angular-cache']);
kissApp.service('globalData', function() {
	return {
		dataLoaded : false,
		message : null
	};
});

kissApp.constant('CACHE_STATE', 'true');

kissApp.controller('progressIndicator', function($scope, globalData,
		$translate, $rootScope) {
	$scope.isDataLoaded = globalData;

	$rootScope.changeLanguage = function(langKey) {
		$translate.use(langKey);
	};

});

kissApp.factory('kissInterceptor', [
		'$rootScope',
		'$location',
		function($rootScope, $location) {

			var sessionInjector = {
				request : function(config) {
					return config;
				},
				response : function(response) {

					//response.config.responseTimestamp = new Date().getTime();
					return response;
				},
				responseError : function(rejection) {

					var status = rejection.status;

					if (status == 404) {

						$rootScope.showAlert = true;
						$rootScope.exceptionData = rejection.status + ':'
								+ rejection.statusText;
					}

					if (status == 401) {
						//redirect to login page
						$location.path('/home');
					}

					return rejection;
				}
			};
			return sessionInjector;
			//};

		} ]);
