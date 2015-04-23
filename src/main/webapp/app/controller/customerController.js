(function() {

	angular.module('kissApp').controller('customerSearchController',['$scope','CustomerService','$state',
			function($scope,CustomerService,$state) {
		
				$scope.areFieldEmpty = false;
				
				$scope.custNo = undefined;
				$scope.getCustomers = function(val){
					return CustomerService.getCustomers(val);
				}
				
				$scope.custoName = undefined;
				$scope.getCustomerNames = function(val){
					return CustomerService.getCustomerNames(val);
				}
				 $scope.processForm = function() {
					 $scope.areFieldEmpty = false;
					 $scope.areFieldEmpty = ($scope.custNo == "" || $scope.custNo == undefined) && ($scope.custoName== undefined || $scope.custoName == "");
						if($scope.areFieldEmpty){
							return;
						}
						$state.go("customer",{cusNo:$scope.custNo});
					 
				 }
			}]);

	angular.module('kissApp').controller('addressSearchController',
			function($scope) {
				$scope.message = "Hello from Address Search";
			});

	angular.module('kissApp').controller('cutabController',
			function($scope, $state, $stateParams) {

				$scope.tabs = [{
					title : 'Cable Unit Details',
					templateUrl : 'content/templates/underDevelopment.html'
				}, {
					title : 'Installation',
					show : true,
					templateUrl : 'content/templates/installation.html'
				},{
					title : 'Documents',
					templateUrl : 'content/templates/underDevelopment.html'
				},{
					title : 'Party Actors',
					templateUrl : 'content/templates/underDevelopment.html'
				}
				];

			});

	angular.module('kissApp').controller('casetabController',
			function($scope, $state, $stateParams) {

				$scope.tabs = [ {
					title : 'Agreements about Products',
					show : true,
					templateUrl : 'content/templates/underDevelopment.html'
				}, {
					title : 'CaseWorkFlow',
					templateUrl : 'content/templates/underDevelopment.html'
				}, {
					title : 'Document Templates',
					templateUrl : 'content/templates/underDevelopment.html'
				},{
					title : 'Addresses',
					templateUrl : 'content/templates/underDevelopment.html'
				},
				];


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
							'$rootScope',
							'$stateParams',
							'$filter',
							'CustomerService','$modal',
							function($scope, $rootScope,$stateParams, $filter,
									CustomerService,$modal) {
								$scope.isLoading = true;
								$scope.rowCollection = [];
								$scope.custNo= $stateParams.cusNo;
								$scope.page=1;
								$scope.currentPage = 0;
								$scope.init=true;
								$scope.showCol = false;
								$scope.displayingMsgType=$rootScope.displayingMsgType;
								$scope.displayingMsgCode=$rootScope.displayingMsgCode;
								$scope.displayingMsgContent=$rootScope.displayingMsgContent;
								
								$rootScope.displayingMsgType=undefined;
								$rootScope.displayingMsgCode=undefined;
								$rootScope.displayingMsgContent=undefined;
								$scope.options = [
								                  { label: 'Stik Opsat', value: 'Stik Opsat' },
								                  { label: 'Fordelerboks Opsat', value: 'Fordelerboks Opsat' },
								                  { label: 'ikke Opdateret', value: 'ikke Opdateret' }
								                ];
								$scope.statusSelected = $scope.options[0];
							
								
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
							

								 tableState.pagination.numberOfPages =$scope.itemsByPage;
									 if($scope.init==true || $scope.currentPage != tableState.pagination.start) {
										 $scope.isLoading = true;
										 $scope.currentPage= tableState.pagination.start;
										 $scope.page=tableState.pagination.start/10+1;	
										// $scope.processForm();
										// console.log('page number'+tableState.pagination.start);
										 $scope.valueForSearch='';

									
									//get the data
							
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
														tableState.pagination.numberOfPages =$scope.itemsByPage;
													});
								};
								};
								$scope.searchData=function(){
									var filtered = $scope.valueForSearch ? $filter('filter')($scope.rowCollection.installations, $scope.valueForSearch) : $scope.rowCollection.installations;
									 $scope.displayed = [].concat(filtered);
							}
							$scope.isUndefined = function (data) {
								    return (typeof data === "undefined");
								}
									
						

						
								 

} ]);





})();