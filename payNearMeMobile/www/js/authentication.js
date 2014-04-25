/**
 * Authentication module, redirects to homepage if not logged in
 */

angular.module('common.authentication', [])

  // Intercepts every http request and appends an auth token
  .factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
      request: function (config) {
        console.log("authInterceptor called")
        config.headers = config.headers || {};
        if ($window.sessionStorage.auth_token) {
          config.headers['HTTP_AUTHORIZATION'] = $window.sessionStorage.auth_token;
          config.headers['HTTP_LOGIN'] = $window.sessionStorage.email_token;
          config.headers['X-CSRF-TOKEN'] = $window.sessionStorage.csrf_token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          console.log('ack not authorized')
          $rootScope.$broadcast('event:unauthorized');
          $window.location.href = '#/';
          return response;
        }
        return response || $q.when(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })