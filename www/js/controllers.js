angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.plannerId = 0;

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
    var plannerName = $scope.loginData.plannerId;
    $scope.plannerId = 0;

    var params = 'planner_name=' + plannerName;
    $http.post('http://naguchi.asia/shiori-of-travel/api/planner.php', encodeURI(params), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function(data) {
      if (data.success) {
      	var plannerId = data.plannerId;
      	$scope.plannerId = plannerId;

        var params = 'planner_id=' + plannerId;
        $http.post('http://naguchi.asia/shiori-of-travel/api/planList.php', encodeURI(params), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
        .success(function(data) {
          if (data.success) {
            $scope.planlists = data.planList;
          }
        });
      }
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlanlistsCtrl', function($scope, $stateParams, $ionicModal, $http, $ionicPopup) {
  // var params = 'planner_id=' + $scope.plannerId;
  // $http.post('http://naguchi.asia/shiori-of-travel/api/planList.php', encodeURI(params), {
  //   headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
  // })
  // .success(function(data) {
  //   if (data.success) {
  //     $scope.planlists = data.planList;
  //   }
  // });

  $ionicModal.fromTemplateUrl('templates/plan_add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPlanAdd = modal;
  });
  $scope.openPlanAdd = function() {
    $scope.plan = [];
    $scope.plan.add = [];

    var params = 'planner_id=' + $scope.plannerId;

    $http.post('http://naguchi.asia/shiori-of-travel/api/memberList.php', encodeURI(params),{
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function(data) {
      if (data.success) {
        $scope.plan.add.memberList = data.memberList;
      }
    });

    $scope.modalPlanAdd.show();
  };
  $scope.closePlanAdd = function() {
    $scope.modalPlanAdd.hide();
  };
  $scope.submitPlanAdd = function() {
    var plan = $scope.plan.add;

    // タイトルがない場合は処理しない
    if (! plan.title) {
      $ionicPopup.alert({
        title: 'サーバーエラー',
        template: 'タイトルを入力してください。'
      });
      return;
    }

    var params = '?hoge=piyo';
    if (plan.title) {
      params += '&title=' + plan.title;
    }
    if (plan.summary) {
      params += '&summary=' + plan.summary;
    }
    if (plan.start) {
      var date = plan.start;
      var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      params += '&start=' + start;

      if (plan.end) {
        var date = plan.end;
        var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        params += '&end=' + end;
      }
    }

    $http.post('http://naguchi.asia/shiori-of-travel/api/planAdd.php', encodeURI(params),{
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .success(function(data) {
      if (data.success) {
        var planId = data.plan_id;
        var memberList = [];
        angular.forEach(plan.memberList, function(member) {
          if (member.checked) {
            memberList.push(member.id);
          }
        });

        if (memberList.length) {
          var params = '';
          var memberListStr = memberList.join(',');

          params = 'plan_id=' + planId + '&member=' + memberListStr;
          $http.post('http://naguchi.asia/shiori-of-travel/api/planMemberAdd.php', encodeURI(params),{
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
          });
        }

        $ionicPopup.alert({
          title: plan.title,
          template: 'プランを追加しました。'
        });
          var params = 'planner_id=' + $scope.plannerId;
          $http.post('http://naguchi.asia/shiori-of-travel/api/planList.php', encodeURI(params), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
          })
          .success(function(data) {
            if (data.success) {
              $scope.planlists = data.planList;
            }
          });
      } else {
        $ionicPopup.alert({
          title: 'サーバーエラー',
          template: 'プランが追加できませんでした。'
        });
      }
    });

    $scope.closePlanAdd();
  };

})

.controller('PlanCtrl', function($scope, $stateParams, $ionicModal, $http) {
  var planId = $stateParams;

  $http.post('http://naguchi.asia/shiori-of-travel/api/attendanceList.php')
  .success(function(data) {
    $scope.attendance = data;
  });

  var planId = $stateParams['planId'];
  var plannerId = $scope.plannerId;
  var params = 'planner_id=' + plannerId;
  params += '&plan_id=' + planId;

  $http.post('http://naguchi.asia/shiori-of-travel/api/plan.php', encodeURI(params),{
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
  })
  .success(function(data) {
    if (data.success) {
      var plan = data.planInfo;
      var memberList = data.memberList;
      var scheduleList = data.scheduleList;

      // プラン詳細に表示するスケジュールを日別に出す
      var groupingDate = [];
      var date = '';
      angular.forEach(scheduleList, function(schedule) {
        if (date != schedule.meeting_date) {
          date = schedule.meeting_date;
          groupingDate.push(schedule.meeting_date);
        }
      });

      $scope.plan = plan;
      $scope.memberList = memberList;
      $scope.scheduleList = scheduleList;
      $scope.groupingDate = groupingDate;
    }
  });

  $ionicModal.fromTemplateUrl('templates/plan_edit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPlanEdit = modal;
  });
  $scope.openPlanEdit = function() {
    var plan = $scope.plan;
    $scope.plan.edit = [];
    $scope.plan.edit = plan;

    $scope.modalPlanEdit.show();
  };
  $scope.closePlanEdit = function() {
    $scope.modalPlanEdit.hide();
  };
  $scope.submitPlanEdit = function() {
    $scope.plan = $scope.plan.edit;

    $scope.closePlanEdit();
  };

});
