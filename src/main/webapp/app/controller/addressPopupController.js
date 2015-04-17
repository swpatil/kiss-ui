(function() {
	

	angular.module('kissApp').controller('modalAddressInstanceCtrl',['$scope','AddressService','$stateParams','$state','CustomerService','$filter', function ($scope,AddressService,$stateParams,$state,CustomerService,$filter) {
		 $scope.rowCollection = [];
		 $scope.addressId=[];
		 $scope.showAddress=false;
		 $scope.page=1;
		 $scope.pageLoded;
		 $scope.isLoading = false;
		 $scope.currentPage = 0;
		 $scope.valueForSearch='';
		 $scope.custNo=$stateParams.cusNo;
		 $scope.streetname = undefined;
		 $scope.getStreets = function(val){
			 return CustomerService.getStreets(val);
		 };
		 



		 if($stateParams.cusNo === null || angular.isUndefined($stateParams.cusNo)){
			 //From Quick Search Page
			 $scope.fromInstallations=false;
		 }
		 else{
			 //From Installations Page
			 $scope.fromInstallations=true;
		 }
		$scope.searchData=function(){
					var filtered = $scope.valueForSearch ? $filter('filter')($scope.rowCollection, $scope.valueForSearch) : $scope.rowCollection;
					 $scope.displayedCollection = [].concat(filtered);
			}
		 $scope.processForm = function() {

			 $scope.isLoading = true;

			 var data = { floor: $scope.floor,door: $scope.door,streetname:$scope.streetname};

			 AddressService.searchAddress(data,$scope.page).then(function (result) {
				 $scope.rowCollection=result.addresses;
				 $scope.itemsByPage=result.totalPages
				 $scope.displayedCollection = [].concat($scope.rowCollection);
				 $scope.showAddress=true;
				 $scope.isLoading = false;

			 });


		 };

		 $scope.selectPage= function (page) {
			 alert(page);



		 };
		 $scope.clear = function () {
			 $scope.searchform.$setPristine();

		 };
		 $scope.getPaginatedData = function (tableState) {

			 if(tableState.sort.predicate != null  || tableState.sort.predicate !=undefined){
				 if(tableState.pagination.start == 0)
					 tableState.pagination.start= $scope.currentPage;
				 console.log("predicate"+tableState.sort.predicate);
				 if (tableState.sort.predicate) {
					 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, tableState.sort.predicate, tableState.sort.reverse);
				 }

			 }
			 //TODO Need to check sorting on default
			 //else{
			 //$scope.displayedCollection = [].concat($scope.rowCollection);
			 //if(tableState.pagination.start == 0)
			 //tableState.pagination.start= $scope.currentPage;
			 //	}

			 tableState.pagination.numberOfPages =$scope.itemsByPage;
			 console.log(tableState.pagination.start);
			 if($scope.currentPage != tableState.pagination.start) {
				 $scope.currentPage= tableState.pagination.start;
				 $scope.page=tableState.pagination.start/10+1;	
				 $scope.processForm();
				 console.log('page number'+tableState.pagination.start);
				 $scope.valueForSearch='';

			 }




		 };

	}]);

				
				

})();