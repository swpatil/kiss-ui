(function() {
	

	angular.module('kissApp').controller('modalAddressInstanceCtrl',['$scope','AddressService','$stateParams','$state','CustomerService', function ($scope,AddressService,$stateParams,$state,CustomerService) {
		 $scope.rowCollection = [];
		 $scope.addressId=[];
		// address.streetName='';
			$scope.init = function() {
				$scope.showAddress=false;
				$scope.custNo=$stateParams.cusNo ;
				if($stateParams.cusNo === null || angular.isUndefined($stateParams.cusNo)){
					//From Quick Search Page
					$scope.fromInstallations=false;
				}
				else{
					//From Installations Page
					$scope.fromInstallations=true;
				}
					
			};
			$scope.processForm = function() {
				//get all the form data;
				
				
				console.log($scope.streetName);
				console.log($scope.floor);

				var data = { streetname: $scope.streetname, floor: $scope.floor };
				AddressService
						.searchAddress(data)
						.then(
								function(result) {
									$scope.showAddress=true;	
								});
				
	
				};
		
		$scope.addSelected = function () {
			

			
		};
		$scope.clear = function () {
			$scope.searchform.$setPristine();
			
		};
//		AddressService
//		.getInstallationsOnAddress(
//				$stateParams.cusNo)
//		.then(
//				function(result) {
//					$scope.rowCollection=result;
//					 $scope.displayedCollection = [].concat($scope.rowCollection);
//					$scope.isLoading = false;
//				});
	}]);

				
				

})();