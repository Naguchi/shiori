// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers'])

.provider("UserUiid", function () {
// console.log("provider");
  var userId = "1";
  return {
    getUserId: function() {
      return userId;
    },
    $get: function () {
    }
  }
})

.run(function($ionicPlatform) {
// console.log("run");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function(UserUiidProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
// console.log("config");
  var userId = UserUiidProvider.getUserId();
// console.log(userId);

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.planlists', {
      url: '/planlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/planlists.html',
          controller: 'PlanlistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/planlists/:planId',
    views: {
      'menuContent': {
        templateUrl: 'templates/plan.html',
        controller: 'PlanCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/planlists');

  $ionicConfigProvider.navBar.alignTitle('center');
})

.filter('format4yyyymd', function() {
  function formatDate(date) {
    if (typeof date != 'string') {
      return false;
    }
    now = new Date();
    date = new Date(date.replace(/-/g, '/'));
    nowY = now.getFullYear();
    targetY = date.getFullYear();
    if (nowY == targetY) {
      return (date.getMonth() + 1) + '月' + date.getDate() + '日';
    } else {
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    }
  }
  return function(date) {
    return formatDate(date);
  };
})
.filter('format4md', function() {
  function formatDate(date) {
    if (typeof date != 'string') {
      return false;
    }
    date = new Date(date.replace(/-/g, '/'));
    return (date.getMonth() + 1) + '月' + date.getDate() + '日';
  }
  return function(date) {
    return formatDate(date);
  };
})
.filter('format4hhmm', function() {
  function formatTime(time) {
    if (typeof time == 'string') {
      time_string = time;
      time_array = time_string.split(':');
      return time_array[0] + '時' + time_array[1] + '分';
    } else {
      return false;
    }
  }
  return function(time) {
    return formatTime(time);
  };
})
;