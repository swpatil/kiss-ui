(function() {
	

	angular.module('kissApp').controller('ModalAddressInstanceCtrl',['$scope','$modalInstance','AddressService','$stateParams','$state', function ($scope,$modalInstance,AddressService,$stateParams,$state) {
		 $scope.rowCollection = [];
		 $scope.addressId=[];
		$scope.ok = function () {
			$modalInstance.close('success');
		};
		$scope.addSelected = function () {
			
			$modalInstance.close('success');
			//$state.go("customer",{cusNo: $stateParams.cusNo});
			
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		AddressService
		.getInstallationsOnAddress(
				$stateParams.cusNo)
		.then(
				function(result) {
					$scope.rowCollection=result;
					 $scope.displayedCollection = [].concat($scope.rowCollection);
					$scope.isLoading = false;
				});
	}]);

				
				

})();