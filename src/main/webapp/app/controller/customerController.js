(function() {

	angular.module('kissApp').controller('customerSearchController',
			function($scope, $location) {

				$scope.message = "Hello from Customer Search";

			});

	angular.module('kissApp').controller('addressSearchController',
			function($scope) {
				$scope.message = "Hello from Address Search";
			});

	angular.module('kissApp').controller('tabController',
			function($scope, $state, $stateParams) {

				$scope.tabs = [ {
					title : 'Home',
					show : true,
					templateUrl : 'content/templates/address-search.html'
				}, {
					title : 'Profile',
					templateUrl : 'content/templates/address-search.html'
				}, {
					title : 'About',
					templateUrl : 'content/templates/address-search.html'
				} ];

				console.log($stateParams.cusNo);

			});
	angular.module('kissApp').controller('treeController',
			function($scope, $state, $stateParams) {

				$scope.message = "Hello from tree control";
				console.log($stateParams.cusNo);

			});

})();