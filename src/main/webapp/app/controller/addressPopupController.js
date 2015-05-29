(function() {
	

	angular.module('kissApp').controller('modalAddressInstanceCtrl',['$scope','$rootScope','AddressService','$stateParams','$state','CustomerService','$filter','$log', function ($scope,$rootScope,AddressService,$stateParams,$state,CustomerService,$filter,$log) {
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
		 $scope.areFieldEmpty = false;
		 $scope.hideSearch = false;
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
		$scope.searchAgain=function(){
			$scope.hideSearch = false;
			
		}
		$scope.addSelected=function(){
			var addData = { addressIds: $scope.addressId,cableUnitNumber:$scope.custNo};
			$log.debug(addData);
			 AddressService.addInstallationsOnAddress(addData).then(function (result) {
				 $rootScope.infoMessage=result.description;
				 if(result.code === '101'){
					 $rootScope.displayingMsgType="success";
				 }
				 else{
					 $rootScope.displayingMsgType="failure";
				 }
				 $rootScope.displayingMsgCode=result.code;
				 $rootScope.displayingMsgContent=result.description;
				 $state.go("customer",{cusNo:$scope.custNo});
			 });
			
		}
		 $scope.processForm = function() {

			 $scope.isLoading = true;


			 var data = { floor: $scope.floor,door: $scope.door,streetname:$scope.streetname};
			 $scope.areFieldEmpty = ($scope.floor == "" || $scope.floor == undefined) && ($scope.door== undefined || $scope.door == "") && ($scope.streetname == "" ||  $scope.streetname == undefined);
				if($scope.areFieldEmpty){
					return;
				}
				

			 AddressService.searchAddress(data,$scope.page).then(function (result) {
				 $scope.rowCollection=result.addresses;
				 $scope.itemsByPage=result.totalPages
				 $scope.displayedCollection = [].concat($scope.rowCollection);
				 $scope.showAddress=true;
				 $scope.isLoading = false;
				 $scope.hideSearch=true;

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
				 $log.debug("predicate"+tableState.sort.predicate);
				 if (tableState.sort.predicate) {
					 if(tableState.sort.predicate === 'streetname'){
						 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, 'streets.streetname', tableState.sort.reverse);
						 
					 }
					 else if(tableState.sort.predicate === 'streetcode'){
						 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, 'streets.streetcode', tableState.sort.reverse);
						 
					 }
					 else if(tableState.sort.predicate === 'municipalitycode'){
						 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, 'streets.municipalities.municipalitycode', tableState.sort.reverse);
						 
					 }
					 else if(tableState.sort.predicate === 'regionid'){
						 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, 'streets.municipalities.regions.regionid', tableState.sort.reverse);
						 
					 }
					 else if(tableState.sort.predicate === 'regionname'){
						 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, 'streets.municipalities.regions.regionname', tableState.sort.reverse);
						 
					 }
					 else if(tableState.sort.predicate === 'source'){
						 $scope.displayedCollection = $filter('orderBy')($scope.rowCollection, 'streets.source', tableState.sort.reverse);
						 
					 }
					 else
						 
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
			 $log.debug(tableState.pagination.start);
			 if($scope.currentPage != tableState.pagination.start) {
				 $scope.currentPage= tableState.pagination.start;
				 $scope.page=tableState.pagination.start/10+1;	
				 $scope.processForm();
				 $log.debug('page number'+tableState.pagination.start);
				 $scope.valueForSearch='';

			 }
			 $scope.$watch('itemsByPage',function(newValue,oldValue,scope){
				 tableState.pagination.numberOfPages =scope.itemsByPage;
			 })




		 };

	}]);

				
				

})();