(function(){
	var app = angular.module('kiss', []);
	app.controller('StoreController',function(){
		this.product = gem;
	});
	
	var gem ={
			name:'Test',price: 2.95,description:'Test description',canPurchase:false
	};
})();
