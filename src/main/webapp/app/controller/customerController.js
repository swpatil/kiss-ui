(function() {

	angular.module('kissApp').controller('customerSearchController',['$scope','CustomerService',
			function($scope,CustomerService) {

				
				$scope.custNo = undefined;
				$scope.getCustomers = function(val){
					return CustomerService.getCustomers(val);
				}
			}]);

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
							'CustomerService','$modal',
							function($scope, $stateParams, $filter,
									CustomerService,$modal) {
								$scope.isLoading = true;
								$scope.rowCollection = [];
								$scope.custNo= $stateParams.cusNo;
								$scope.page=1;
								$scope.currentPage = 0;
								$scope.init=true;
							
								
								$scope.getIndtallations = function(tableState) {
								
									//$scope.page=tableState.pagination.start/10+1;

								if(tableState.sort.predicate != null  || tableState.sort.predicate !=undefined){
										 if(tableState.pagination.start == 0)
											 tableState.pagination.start= $scope.currentPage;
										 console.log("predicate"+tableState.sort.predicate);
										 if (tableState.sort.predicate) {
											 $scope.displayed = $filter('orderBy')($scope.rowCollection.installations, tableState.sort.predicate, tableState.sort.reverse);
										 }

									 }
								// tableState.pagination.numberOfPages =$scope.itemsByPage;
								// console.log(tableState.pagination.start);
							
									$scope.currentPage= tableState.pagination.start;
									$scope.page=tableState.pagination.start/10+1;	

									//get the data
									if($scope.init==true){
									CustomerService
									.getInstallations(
											$stateParams.cusNo,$scope.page)
											.then(
													function(result) {
														$scope.rowCollection=result;
														$scope.itemsByPage=$scope.rowCollection.totalPages;
														$scope.displayed = [].concat($scope.rowCollection.installations);
														$scope.isLoading = false;
														$scope.init=false;
													});
								};
								};
								$scope.searchData=function(){
									var filtered = $scope.valueForSearch ? $filter('filter')($scope.rowCollection.installations, $scope.valueForSearch) : $scope.rowCollection.installations;
									 $scope.displayed = [].concat(filtered);
							}
									
						

						
								 

} ]);





})();