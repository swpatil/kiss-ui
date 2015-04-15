(function() {
	

	angular.module('kissApp').controller('modalAddressInstanceCtrl',['$scope','AddressService','$stateParams','$state','CustomerService', function ($scope,AddressService,$stateParams,$state,CustomerService) {
		 $scope.rowCollection = [];
		 $scope.addressId=[];
		 $scope.showAddress=false;
		 $scope.page=1;
		 $scope.pageLoded;
		

		 
				if($stateParams.cusNo === null || angular.isUndefined($stateParams.cusNo)){
					//From Quick Search Page
					$scope.fromInstallations=false;
				}
				else{
					//From Installations Page
					$scope.fromInstallations=true;
				}
					
			$scope.processForm = function() {
				
				$scope.isLoading = true;

				var data = { floor: $scope.floor,door: $scope.door};
//				if(tableState.search.predicateObject!= undefined){
//					
//					$scope.displayed = tableState.search.predicateObject.$==undefined ? $filter('filter')($scope.displayed, tableState.search.predicateObject) : $scope.displayed;
//				} 
				

			  
				//if(tableState.search.predicateObject == undefined){
					//var pagination = tableState.pagination;

				    //var start = pagination.start || 0;
				  // var number = pagination.number || 10;

				   AddressService.searchAddress(data,$scope.page).then(function (result) {
					   	$scope.rowCollection=result.addresses;
					   	$scope.itemsByPage=result.totalPages
				    	$scope.displayedCollection = [].concat($scope.rowCollection);
				    // tableState.pagination.numberOfPages = 20;
				    	$scope.showAddress=true;
				    	$scope.isLoading = false;
			
				    });
				//}
	
				
				};
		
		$scope.selectPage= function (page) {
			alert(page);
			

			
		};
		$scope.clear = function () {
			$scope.searchform.$setPristine();
			
		};
		$scope.getPaginatedData = function (tableState) {
			if(tableState.sort.predicate != null  || tableState.sort.predicate !=undefined){
				console.log("predicate"+tableState.sort.predicate);
			}
			else{
			//$scope.isLoading = true;
			 tableState.pagination.numberOfPages =$scope.itemsByPage;
			 var page=tableState.pagination.start;
			if(page != 0 ||  $scope.pageLoded != undefined){
				$scope.pageLoded=true;
				 $scope.page=page/10+1;	
				 $scope.processForm();
				 console.log('page number'+page); 
			 }
			//$scope.isLoading = true;
			}
			
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