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

// adapted from https://github.com/yafraorg/ionictests/blob/master/camera
.controller('CamCtrl', ['$scope', '$location', 'GetUU',
  function($scope, $location, GetUU) {

    // init variables
    $scope.data = {};
    $scope.obj;
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    var url;

    // on DeviceReady check if already logged in (in our case CODE saved)
    ionic.Platform.ready(function() {
      console.log("ready get camera types");
      if (!navigator.camera)
      {
        console.log("no camera");
        // error handling
        return;
      }
      //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
      pictureSource=navigator.camera.PictureSourceType.CAMERA;
      destinationType=navigator.camera.DestinationType.FILE_URI;
    });

    // get upload URL for FORM
    GetUU.query(function(response) {
      $scope.data = response;
      console.log("got upload url ", $scope.data.uploadurl);
    });

    // take picture
    $scope.takePicture = function() {
      console.log("got camera button click");
      var options =   {
        quality: 50,
        destinationType: destinationType,
        sourceType: pictureSource,
        encodingType: 0
      };
      if (!navigator.camera)
      {
        console.log('no camera')
        // error handling
        return;
      }
      navigator.camera.getPicture(
          function (imageURI) {
            console.log("got camera success ", imageURI);
            $scope.mypicture = imageURI;
          },
          function (err) {
            console.log("got camera error ", err);
            // error handling camera plugin
          },
          options);
    };

    // do POST on upload url form by http / html form
    $scope.update = function(obj) {
      if (!$scope.data.uploadurl)
      {
        // error handling no upload url
        return;
      }
      if (!$scope.mypicture)
      {
        // error handling no picture given
        return;
      }
      var options = new FileUploadOptions();
      options.fileKey="ffile";
      options.fileName=$scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
      options.mimeType="image/jpeg";
      var params = {};
      params.other = obj.text; // some other POST fields
      options.params = params;

      //console.log("new imp: prepare upload now");
      var ft = new FileTransfer();
      ft.upload($scope.mypicture, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
      function uploadSuccess(r) {
        // handle success like a message to the user
      }
      function uploadError(error) {
        //console.log("upload error source " + error.source);
        //console.log("upload error target " + error.target);
      }
    };
 }])

.controller( 'LoginCtrl', function LoginController( $scope, $http, $window, $location ) {
  $scope.login_user = {email: null, password: null};
  $scope.login_error = {message: null, errors: {}};

  $scope.login = function() {
    $scope.submit({method: 'POST',
      url: 'http://localhost:3000/mobile_signin.json',
      data: {user: {email: $scope.login_user.email, password: $scope.login_user.password}},
      success_message: "You have been logged in.",
      error_entity: $scope.login_error});
  };

  $scope.logout = function() {
    $scope.submit({method: 'DELETE',
      url: 'http://localhost:3000/mobile_signout',
      success_message: "You have been logged out.",
      error_entity: $scope.login_error});
  };

  $scope.submit = function(parameters) {
    $scope.reset_messages();
    console.log(parameters.data);
    $http({method: parameters.method,
      url: parameters.url,
      data: parameters.data})
        .success(function(data, status){
          if (status == 201 || status == 204){
            parameters.error_entity.message = parameters.success_message;
            $scope.reset_users();

            // Store auth credentials
            if(data.auth_token){
              $window.sessionStorage.auth_token = data.auth_token;
              $window.sessionStorage.csrf_token = data.csrf_token;
              $window.sessionStorage.email_token = data.email_token;
              $window.sessionStorage.site_id = data.site_id;

              // redirect
              $window.location.href = '/www/index.html#/app/dashboard';
              return;
            }

          } else {
            if (data.error) {
              parameters.error_entity.message = data.error;
            } else {
              // note that JSON.stringify is not supported in some older browsers, we're ignoring that
              parameters.error_entity.message = "Success, but with an unexpected success code, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
            }
          }
        })
        .error(function(data, status){
          if (status == 422) {
            parameters.error_entity.errors = data.errors;
          } else {
            if (data.error) {
              parameters.error_entity.message = data.error;
            } else {
              // note that JSON.stringify is not supported in some older browsers, we're ignoring that
              parameters.error_entity.message = "Unexplained error, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
            }
          }
        });
  };

  $scope.reset_messages = function() {
    $scope.login_error.message = null;
    $scope.login_error.errors = {};
  };

  $scope.reset_users = function() {
    $scope.login_user.email = null;
    $scope.login_user.password = null;
  };
})
