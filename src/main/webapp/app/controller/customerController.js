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

	angular.module('kissApp').controller('treeController',function($scope,$http,$state, $stateParams){

		  	//test tree model 1
					var link='http://localhost:8080/rest/cableunit/cu/'+$stateParams.cusNo;
					$http.get(link).
						success(function(data, status, headers, config) {
					 $scope.roleList= [data];
					  }).
						error(function(data, status, headers, config) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
					  });
		     

		      
		      

		  
		  });

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