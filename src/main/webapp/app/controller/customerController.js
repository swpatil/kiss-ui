(function() {

	angular.module('kissApp').controller('customerSearchController',
			function($scope, $location) {

				$scope.message = "Hello from Customer Search";

			});

	angular.module('kissApp').controller('addressSearchController',
			function($scope) {
				$scope.message = "Hello from Address Search";
			});

	angular.module('kissApp').controller('cutabController',
			function($scope, $state, $stateParams) {

				$scope.tabs = [ {
					title : 'Installation',
					show : true,
					templateUrl : 'content/templates/installation.html'
				}, {
					title : 'Cable Unit Details',
					templateUrl : 'content/templates/address-search.html'
				}, {
					title : 'Products',
					templateUrl : 'content/templates/address-search.html'
				} ];

			});

	angular.module('kissApp').controller('casetabController',
			function($scope, $state, $stateParams) {

				$scope.tabs = [ {
					title : 'Agreements about Products',
					show : true,
					templateUrl : 'content/templates/address-search.html'
				}, {
					title : 'CaseWorkFlow',
					templateUrl : 'content/templates/address-search.html'
				}, {
					title : 'Address',
					templateUrl : 'content/templates/address-search.html'
				} ];


			});
		  angular
			.module('kissApp')
			.controller(
					'treeController',
					[
							'$scope',
							'$stateParams',						
							'CustomerService',
							function($scope, $stateParams,
									CustomerService) {
								$scope.init = function() {

									console.log('$stateParams.cusNo'
											+ $stateParams.cusNo);
									CustomerService
											.getCustomerTree(
													$stateParams.cusNo)
											.then(
											
													function(result) {
														 $scope.roleList= [result];
														$scope.isLoading = false;
													});
								};

							} ]);

	angular
			.module('kissApp')
			.controller(
					'instController',
					[
							'$scope',
							'$stateParams',
							'$filter',
							'CustomerService',
							function($scope, $stateParams, $filter,
									CustomerService) {
								$scope.isLoading = true;
								$scope.rowCollection = [];
								$scope.init = function() {

									console.log('$stateParams.cusNo'
											+ $stateParams.cusNo);
									CustomerService
											.getInstallations(
													$stateParams.cusNo)
											.then(
													function(result) {
														$scope.displayed = result;
														$scope.rowCollection = []
																.concat($scope.displayed);
														$scope.isLoading = false;
													});
								};

							} ]);

})();