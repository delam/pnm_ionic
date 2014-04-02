var pnmServices = angular.module('pnmServices', ['ngResource']);

//phonecatServices.factory('Phone', ['$resource',
//  function($resource){
//    return $resource('phones/:phoneId.json', {}, {
//      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//    });
//  }]);

pnmServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('http://localhost:3000/api/3.0/sites/:phoneId?callback=JSON_CALLBACK', {}, {
      query: {method:'JSONP', params:{phoneId:''}, isArray:true},
      get: {method:'JSONP', params:{phoneId:''}, isArray:true}
    });
  }]);