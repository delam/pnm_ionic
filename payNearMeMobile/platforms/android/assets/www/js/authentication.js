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
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'token=' + $window.sessionStorage.auth_token + ' email=' +  $window.sessionStorage.email_token;
          config.headers.common['X-CSRF-Token'] = $window.sessionStorage.csrf_token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
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