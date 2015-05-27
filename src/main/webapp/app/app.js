//(function() {

var kissApp = angular.module('kissApp', [ 'ui.router','smart-table','angularTreeview','ui.bootstrap','cfp.hotkeys']);
kissApp.service('globalData',function(){
	return{
		dataLoaded : false,
		message : null
	};
});

kissApp.controller('progressIndicator',function($scope,globalData){
	$scope.isDataLoaded = globalData;
});

kissApp.factory('kissInterceptor',function($rootScope,$location){
	var sessionInjector = {
	        request: function(config) {
	            return config;
	        },
	        response: function(response) {
	        	
	            //response.config.responseTimestamp = new Date().getTime();
	            return response;
	        },
	        responseError :function(rejection){
	        	
	        	var status = rejection.status;
	        	
	        	if(status == 404){
	        		
	        		$rootScope.showAlert = true;
	        		$rootScope.exceptionData = rejection.status +':' +rejection.statusText;
	        	}
	        	
	        	if(status == 401){
	        		//redirect to login page
	        		$location.path('/home');
	        	}
	        	
	        	return rejection;
	        }
	    };
	    return sessionInjector;
	//};
	
	
})
//})();