angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlanlistsCtrl', function($scope, $stateParams, $ionicModal, $http) {
  $http.post('http://localhost:8888/shiori-of-travel/api/planList.php')
  .success(function(data) {
    $scope.planlists = data;
  });
})

.controller('PlanCtrl', function($scope, $stateParams, $ionicModal, $http) {
  var planId = $stateParams;

  $http.post('http://localhost:8888/shiori-of-travel/api/attendanceList.php')
  .success(function(data) {
    $scope.attendance = data;
  });

  var planId = $stateParams['planId'];
  var params = 'planId=' + planId;

  $http.post('http://localhost:8888/shiori-of-travel/api/plan.php', encodeURI(params),{
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
  })
  .success(function(data) {
    if (data.success) {
      var plan = data.planInfo;
      var memberList = data.memberList;
      $scope.plan = plan;
      $scope.memberList = memberList;
    }
  });

  $ionicModal.fromTemplateUrl('templates/plan_edit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPlanEdit = modal;
  });
  $scope.openPlanEdit = function() {
    var plan = $scope.plan;
    $scope.edit = [];
    $scope.edit.plan = plan;
    $scope.title = plan.title;

    $scope.modalPlanEdit.show();
  };
  $scope.closePlanEdit = function() {
    $scope.modalPlanEdit.hide();
  };
  $scope.submitPlanEdit = function() {
    $scope.plan = $scope.edit.plan;

    $scope.closePlanEdit();
  };

});