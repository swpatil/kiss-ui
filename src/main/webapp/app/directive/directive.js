angular.module('kissApp').directive('myTabs', [ function() {
	return {
		restrict : 'AE',
		scope : false,
		templateUrl : 'content/templates/myTabs.html',
		link : function(scope, element, attrs) {
			scope.tabs = scope.$eval(attrs.tabs);

			scope.setActiveTab = function(title) {
				for (var i = 0; i < scope.tabs.length; i++) {
					scope.tabs[i].show = false; // hide all the other tabs 

					if (scope.tabs[i].title === title) {
						scope.tabs[i].show = true; // show the new tab 
					}
				}
			};
		}
	};
} ])

.directive('staticInclude', function($http, $templateCache, $compile) {
	return function(scope, element, attrs) {
		var templatePath = attrs.staticInclude;
		$http.get(templatePath, {
			cache : $templateCache
		}).success(function(response) {
			var contents = element.html(response).contents();
			$compile(contents)(scope);
		});
	};
});