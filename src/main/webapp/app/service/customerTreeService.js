(function() {

angular.module('kissApp').service('CustomerTreeService', function ($http,$log, $q) {

    this.getCustomerTree = function (cusNo) {
        var d = $q.defer();
		$log.debug('cusNo' + cusNo);

        $http.get('/rest/installations/' + cusNo)
            .success(function (response) {
                d.resolve(response);
            })
            .error(function () {
                d.reject();
            });

        return d.promise;
    };
});


})();