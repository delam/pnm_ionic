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

.controller('PaymentsCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.payments = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
}])

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
