kissApp
		.controller(
				'customerSearchController',
				[
						'$scope',
						'CustomerService',
						'$state',
						'hotkeys',
						function($scope, CustomerService, $state, hotkeys) {

							$scope.areFieldEmpty = false;

							$scope.custNo = undefined;
							$scope.getCustomers = function(val) {
								return CustomerService.getCustomers(val);
							};

							$scope.custoName = undefined;
							$scope.getCustomerNames = function(val) {
								return CustomerService.getCustomerNames(val);
							};
							$scope.processForm = function() {
								$scope.areFieldEmpty = false;
								$scope.areFieldEmpty = ($scope.custNo == "" || $scope.custNo == undefined)
										&& ($scope.custoName == undefined || $scope.custoName == "");
								if ($scope.areFieldEmpty) {
									return;
								}
								$state.go("customer", {
									cusNo : $scope.custNo
								});

							};

							hotkeys.bindTo($scope).add({
								combo : 'ctrl+f',
								description : 'Search Customer',
								callback : function(event) {
									event.preventDefault();
									$scope.processForm();
								}
							})
							// you can chain these methods for ease of use:
							.add({
								combo : 'ctrl+home',
								description : 'Clear Form',
								callback : function() {
									$scope.clearForm();
								}
							});

							$scope.clearForm = function() {
								$scope.custNo = undefined;
								$scope.custoName = undefined;
								$scope.areFieldEmpty = false;
							};

						} ]);

kissApp.controller('addressSearchController', [ '$scope', function($scope) {
	$scope.message = "Hello from Address Search";
} ]);

kissApp.controller('cutabController', [ '$scope', '$state', '$stateParams',
		'hotkeys', function($scope, $state, $stateParams, hotkeys) {

			$scope.tabs = [ {
				title : 'Cable Unit Details',
				templateUrl : 'content/templates/underDevelopment.html'
			}, {
				title : 'Installation',
				show : true,
				templateUrl : 'content/templates/installation.html'
			}, {
				title : 'Documents',
				templateUrl : 'content/templates/underDevelopment.html'
			}, {
				title : 'Party Actors',
				templateUrl : 'content/templates/underDevelopment.html'
			} ];

			hotkeys.bindTo($scope).add({
				combo : 'ctrl+b',
				description : 'Hide/Show tree view',
				callback : function(event) {
					$scope.hideTree();
				}
			});

			$scope.hideTree = function() {

				$("#openButton").toggle();
				// angular.element(document.getElementById('insthtml')).scope().showcol
				// = true;
				$('#form_div').animate({
					width : 'toggle'
				}, 200, function() {
					$("#closeButton").toggle();
				});
				$("#wrapper").toggleClass("toggled");

			};

		} ]);

kissApp.controller('casetabController', function($scope, $state, $stateParams) {

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
	}, {
		title : 'Addresses',
		templateUrl : 'content/templates/underDevelopment.html'
	}, ];

});

angular
		.module('kissApp')
		.controller(
				'treeController',
				[
						'$scope',
						'$stateParams',
						'$log',
						'CustomerService',
						'$state',
						function($scope, $stateParams, $log, CustomerService,
								$state) {
							$scope.init = function() {
								$log.debug('$stateParams.cusNo'
										+ $stateParams.cusNo);
								CustomerService
										.getCustomerTree($stateParams.cusNo)
										.then(

												function(result) {
													$scope.roleList = [ result ];
													$('#treeview')
															.treeview(
																	{
																		data : $scope.roleList,
																		onNodeSelected : function(
																				event,
																				data) {
																			if (data.type == 'cu')
																				$state
																						.go(
																								"customer",
																								{
																									cusNo : data.id
																								});
																			else
																				$state
																						.go(
																								"customer."
																										+ data.type,
																								{
																									caseNo : data.id
																								});
																		},
																		backColor : 'rgba(255,0,0,0.0)',
																		color : 'lightgrey !important',
																		borderColor : 'rgba(255,0,0,0.0)',
																		onhoverColor : 'rgba(130, 130, 130, 0.55);',
																		expandIcon : 'glyphicon glyphicon-folder-close',
																		collapseIcon : 'glyphicon glyphicon-folder-open',
																		emptyIcon : 'glyphicon glyphicon-file',
																		selectedBackColor : '#7890A8'
																	});
													$scope.isLoading = false;
												});
							};
						} ]);
kissApp
		.controller(
				'instController',
				[
						'$scope',
						'$rootScope',
						'$stateParams',
						'$filter',
						'$modal',
						'$log',
						'CustomerService',
						'DroolsService',
						'ExportToExcelService',
						function($scope, $rootScope, $stateParams, $filter,
								$modal, $log, CustomerService, DroolsService,
								ExportToExcelService) {

							$log.debug("HELLO FROM DEV ENVIRONMENT");
							// Variable to hold drools validations results

							$scope.drools = [];
							$scope.isLoading = true;
							$scope.rowCollection = [];
							$scope.custNo = $stateParams.cusNo;
							$scope.page = 1;
							$scope.currentPage = 0;
							$scope.init = true;
							$scope.showCol = false;

							$scope.displayingMsgType = $rootScope.displayingMsgType;
							$scope.displayingMsgCode = $rootScope.displayingMsgCode;
							$scope.displayingMsgContent = $rootScope.displayingMsgContent;

							$rootScope.displayingMsgType = undefined;
							$rootScope.displayingMsgCode = undefined;
							$rootScope.displayingMsgContent = undefined;

							$scope.options = [ {
								label : 'Stik Opsat',
								value : 'Stik Opsat'
							}, {
								label : 'Fordelerboks Opsat',
								value : 'Fordelerboks Opsat'
							}, {
								label : 'ikke Opdateret',
								value : 'ikke Opdateret'
							} ];

							$scope.statusSelected = $scope.options[0];

							$scope.getIndtallations = function(tableState) {

								// $scope.page=tableState.pagination.start/10+1;

								if (tableState.sort.predicate != null
										|| tableState.sort.predicate != undefined) {
									if (tableState.pagination.start == 0)
										tableState.pagination.start = $scope.currentPage;
									$log.debug("predicate"
											+ tableState.sort.predicate);
									if (tableState.sort.predicate) {
										$scope.displayed = $filter('orderBy')
												(
														$scope.rowCollection.installations,
														tableState.sort.predicate,
														tableState.sort.reverse);
									}

								}
								// tableState.pagination.numberOfPages
								// =$scope.itemsByPage;
								// $log.debug(tableState.pagination.start);

								tableState.pagination.numberOfPages = $scope.itemsByPage;
								if ($scope.init == true
										|| $scope.currentPage != tableState.pagination.start) {
									$scope.isLoading = true;
									$scope.currentPage = tableState.pagination.start;
									$scope.page = tableState.pagination.start / 10 + 1;
									// $scope.processForm();
									// $log.debug('page
									// number'+tableState.pagination.start);
									$scope.valueForSearch = '';

									// $scope.page=tableState.pagination.start/10+1;

									// get the data

									CustomerService
											.getInstallations(
													$stateParams.cusNo,
													$scope.page)
											.then(
													function(result) {
														$scope.rowCollection = result;
														$scope.itemsByPage = $scope.rowCollection.totalPages;
														$scope.displayed = []
																.concat($scope.rowCollection.installations);
														$scope.isLoading = false;
														$scope.init = false;
														tableState.pagination.numberOfPages = $scope.itemsByPage;
														DroolsService
																.getBusinessRules()
																.then(
																		function(
																				droolsResponse) {
																			$scope.drools = droolsResponse;
																		});

														$scope.oldCollection = angular
																.copy($scope.rowCollection);

													});
								}
								;

							};
							$scope.searchData = function() {
								var filtered = $scope.valueForSearch ? $filter(
										'filter')(
										$scope.rowCollection.installations,
										$scope.valueForSearch)
										: $scope.rowCollection.installations;
								$scope.displayed = [].concat(filtered);
							};
							$scope.isUndefined = function(data) {
								return (typeof data === "undefined");
							};

							$scope.exportToElsInstallations = function() {
								// ExportToExcelService.exportToElsInstallations();
								var form = document.createElement("form");
								form
										.setAttribute("action",
												"/kiss-rest/exportToExcel/installations/");
								form.setAttribute("method", "get");
								form.setAttribute("target", "_blank");
								form.submit();
							};
							$scope.notes = {
								templateUrl : 'content/templates/editNoteTemplate.html',
								title : 'Edit Note'
							};

							$scope.addNotes = function() {
								$scope.date = new Date();
							};
							$scope.submitNotes = function() {
								alert('Notes has been submitted');
							};

							
							Date.prototype.toDMY = function Date_toDMY() {
								var year, month, day;
								year = String(this.getFullYear());
								month = String(this.getMonth() + 1);
								if (month.length == 1) {
									month = "0" + month;
								}
								day = String(this.getDate());
								if (day.length == 1) {
									day = "0" + day;
								}
								return day + "-" + month + "-" + year;
							};

							$scope.addHyphen = function() {
								var wholeDate = $scope.dt;
								var isValid = true;
								var todaysDate = (new Date).toDMY();
								if (wholeDate && Number(wholeDate)) {

									if (wholeDate.length == 6) {
										var dateRegex = new RegExp(
												"^([0-9]{2})([0-9]{2})([0-9]{2})$");
										var matches = dateRegex.exec(wholeDate);
										var day = matches[1];
										var month = matches[2];

										if (month < 1 || month > 12) {
											$(event.srcElement || event.target)
													.val(todaysDate);
											$('#datePickerInput').val(
													todaysDate);
											isValid = false;
											return false;
										}
										if (day < 1 || day > 31) {
											$(event.srcElement || event.target)
													.val(todaysDate);
											$('#datePickerInput').val(
													todaysDate);
											isValid = false;
											return false;
										}
										if ((month == 4 || month == 6
												|| month == 9 || month == 11)
												&& day == 31) {
											$(event.srcElement || event.target)
													.val(todaysDate);
											$('#datePickerInput').val(
													todaysDate);
											$scope.dt = todaysDate;
											isValid = false;
											return false;
										}
										if (month == 2) {
											var originalDate = new Date(
													matches[2] + '-'
															+ matches[1] + '-'
															+ matches[3]);
											var dateRegex = new RegExp(
													"^([0-9]{2})([0-9]{2})([0-9]{2})$");
											var leapmatches = dateRegex
													.exec(wholeDate);
											console.log(dateRegex
													.exec(originalDate));
											if (leapmatches) {
												var year = leapmatches[3];
												var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
												if (day > 29
														|| (day == 29 && !isleap)) {
													$(
															event.srcElement
																	|| event.target)
															.val(todaysDate);
													isValid = false;
													return false;
												}
											} else {
												$(
														event.srcElement
																|| event.target)
														.val(todaysDate);
												$('#datePickerInput').val(
														todaysDate);
												return false;
											}
										}
										if (isValid) {
											var formattedDate = new Date(
													matches[2] + '-'
															+ matches[1] + '-'
															+ matches[3]);
											formattedDate
													.setFullYear(formattedDate
															.getFullYear());
										}
										$(event.srcElement || event.target)
												.val(formattedDate.toDMY());
										$('#datePickerInput').val(
												formattedDate.toDMY());
									}
								} else {
									$(event.srcElement || event.target).val(
											(new Date).toDMY());
									$('#datePickerInput').val(
											(new Date).toDMY());
								}

							};

							$scope.open = function(size) {
								$scope.modalValues = [ 'item1', 'item2',
										'item3' ];

								var modalInstance = $modal
										.open({
											animation : $scope.animationsEnabled,
											templateUrl : 'content/templates/showHistory.html',
											controller : 'ModalInstanceCtrl',
											size : size,
											resolve : {
												items : function() {
													return $scope.displayed;
												}
											}
										});

								modalInstance.result.then(
										function(selectedItem) {
											$scope.selected = selectedItem;
										}, function() {
											$log.info('Modal dismissed at: '
													+ new Date());
										});

							};

							$scope.clear = function() {
								$scope.dt = null;
							};

							$scope.openPicker = function($event) {
								$event.preventDefault();
								$event.stopPropagation();

								$scope.opened = true;
								$('#datetimepicker').datetimepicker({
									format : 'DD-MM-YYYY'
								});
							};

						} ]);

kissApp.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', 'items',
		function($scope, $modalInstance, items) {

			$scope.items = items;
			$scope.selected = {
				item : $scope.items[0]
			};

			$scope.ok = function() {
				$modalInstance.close($scope.selected.item);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};
		} ]);
