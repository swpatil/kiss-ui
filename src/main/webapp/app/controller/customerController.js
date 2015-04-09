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
							'CustomerService','$modal',
							function($scope, $stateParams, $filter,
									CustomerService,$modal) {
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
								  $scope.open = function (size) {

 
								var modalOptions = {
								  templateUrl: 'content/templates/popup-address.html',
								  controller: 'ModalAddressInstanceCtrl',
								  size: 'lg'
								};
								$modal.open(modalOptions);
  };

} ]);


			angular.module('kissApp').controller('ModalAddressInstanceCtrl',['$scope','$modalInstance', function ($scope,$modalInstance) {
			$scope.ok = function () {
				$modalInstance.close('success');
			  };
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			  };
			      $scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];
			}]);



})();