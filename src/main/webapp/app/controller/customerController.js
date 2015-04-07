(function() {

	kissApp.controller('customerSearchController',
			function($scope, $location) {

				$scope.message = "Hello from Customer Search";

			});

	kissApp.controller('addressSearchController',
			function($scope) {
				$scope.message = "Hello from Address Search";
			});

	kissApp.controller('tabController',
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

	kissApp.controller('treeController', 
			function($scope,$http,$state, $stateParams) {



			$scope.toggle = function(scope) {
				//alert(scope);
			  scope.toggle();
			};


			var getRootNodesScope = function() {
			  return angular.element(document.getElementById("tree-root")).scope();
			};

			$scope.collapseAll = function() {
			  var scope = getRootNodesScope();
			  scope.collapseAll();
			};

			$scope.expandAll = function() {
			  var scope = getRootNodesScope();
			  scope.expandAll();
			};
			var link='http://localhost:8080/rest/cableunit/cu/'+$stateParams.cusNo;
			$http.get(link).
				success(function(data, status, headers, config) {
			 $scope.data = [data];
			  }).
				error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			  });
		  });

})();