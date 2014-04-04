angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('DashboardCtrl', function($scope) {
  $scope.items = [
    { title: 'Payments', href: 'payments', item_title: 'Recent Payments',
      item_content: [
        {label: 'Cute Puppies', content_id: 1},
        {label: 'Greyhound', content_id: 2}
      ]
    },
    { title: 'Payment Locations', href: 'payment_locations', item_title: '', item_content: [] },
    { title: 'Payment Reminders', href: 'payment_reminders', item_title: '', item_content: []},
    { title: 'Featured', href: 'featured', item_title: '', item_content: []}
  ];
})

.controller('PaymentsCtrl', function($scope, SiteSearch, PaycodeSearch) {

  var doBillerSearch = ionic.debounce(function(biller_query) {
    SiteSearch.biller_search(biller_query).then(function(resp) {
      $scope.sites = resp.result.payees.site;
    });
  }, 500);

  var doPaycodeSearch = ionic.debounce(function(paycode_query) {
    PaycodeSearch.paycode_search(paycode_query).then(function(resp) {
      $scope.paycode = resp.result.order;
    });
  }, 500);


  $scope.biller_search = function() {
    doBillerSearch($scope.biller_query);
  }

  $scope.paycode_search = function() {
    doPaycodeSearch($scope.paycode_query);
  }

})

.controller('PaymentRemindersCtrl', function($scope) {
  $scope.payment_reminders = [
    { title: 'blue', id: 1 },
    { title: 'red', id: 2 },
    { title: 'green', id: 3 },
    { title: 'yellow', id: 4 },
    { title: 'purple', id: 5 },
    { title: 'beige', id: 6 }
  ];
})

.controller('PaymentLocationsCtrl', function($scope) {
  $scope.payment_locations = [
    { title: 'ky', id: 1 },
    { title: 'mn', id: 2 },
    { title: 'la', id: 3 },
    { title: 'ca', id: 4 },
    { title: 'ny', id: 5 },
    { title: 'sc', id: 6 }
  ];
})

.controller('PaymentReminderCtrl', function($scope, $stateParams) {
})

.controller('PaymentLocationCtrl', function($scope, $stateParams) {
})

.controller('PaymentCtrl', function($scope, $stateParams) {
})

.controller('SettingsCtrl', function($scope, $stateParams) {
})

.controller('FeaturedCtrl', function($scope, $stateParams) {
  var ref = window.open('http://www.paynearme.com/spotify', '_blank', 'location=yes');
  ref.addEventListener('loadstart', function(){});
})
