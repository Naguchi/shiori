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

.controller('PlanlistsCtrl', function($scope) {
  // DBからプラン一覧を取得する
  var planlists = [
    {
      id : '1',
      title : '伊豆ツーリング',
      summary : '異種ツーリングメンバーでターンパイク行った後に伊豆に泊まり、翌日は相模湖のプレジャーフォレストでBBQ。',
      start : '2016-05-21',
      end : '2016-05-22',
    },
    {
      id : '2',
      title : 'テスト',
      summary : 'テストサマリー',
      start : '1992-06-05',
      end : '',
    },
    /*
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
    */
  ];
  angular.forEach(planlists, function(plan, key) {


  });
  $scope.planlists = planlists;
})

.controller('PlanCtrl', function($scope, $stateParams) {
  var planId = $stateParams;

  var plan = {
    id : '1',
    title : '伊豆ツーリング',
    summary : '異種ツーリングメンバーでターンパイク行った後に伊豆に泊まり、翌日は相模湖のプレジャーフォレストでBBQ。',
    start : '2016-05-21',
    end : '2016-05-22',
  };
  var memberlists = [
    { name : 'なぐっち', attendance : 6 },
    { name : '岡田', attendance : 2 },
    { name : '前田', attendance : 1 },
    { name : 'くろかい', attendance : 2 },
    { name : 'こば', attendance : 5 },
  ];

  $scope.plan = plan;
  $scope.memberlists = memberlists;
  $scope.attendance = ['', '連絡なし', '参加', '不参加', '検討中' ,'途中から合流', '途中から離脱'];




});