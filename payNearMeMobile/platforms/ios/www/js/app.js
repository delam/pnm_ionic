// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'common.authentication'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html",
          controller: 'DashboardCtrl'
        }
      }
    })

    .state('app.payments', {
      url: "/payments",
      views: {
        'menuContent' :{
          templateUrl: "templates/payments.html"
        }
      }
    })
    .state('app.payment_locations', {
      url: "/payment_locations",
      views: {
        'menuContent' :{
          templateUrl: "templates/payment_locations.html",
          controller: 'PaymentLocationsCtrl'
        }
      }
    })
    .state('app.payment_reminders', {
      url: "/payment_reminders",
      views: {
        'menuContent' :{
          templateUrl: "templates/payment_reminders.html",
          controller: 'PaymentRemindersCtrl'
        }
      }
    })
    .state('app.featured', {
      url: "/featured",
      views: {
        'menuContent' :{
          templateUrl: "templates/featured.html",
          controller: 'FeaturedCtrl'
        }
      }
    })

    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/payments/:paymentId",
      views: {
        'menuContent' :{
          templateUrl: "templates/payment.html",
          controller: 'PaymentCtrl'
        }
      }
    })

    .state('app.cam', {
      url: '/cam',
      views: {
        'menuContent' :{
          templateUrl: "templates/cam.html",
          controller: 'CamCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

