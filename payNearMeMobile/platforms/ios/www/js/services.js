angular.module('starter.services', ['ngResource'])

//phonecatServices.factory('Phone', ['$resource',
//  function($resource){
//    return $resource('phones/:phoneId.json', {}, {
//      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//    });
//  }]);

//pnmServices.factory('Phone', ['$resource',
//  function($resource){
//    return $resource('http://localhost:3000/api/3.0/sites/:phoneId?callback=JSON_CALLBACK', {}, {
//      query: {method:'JSONP', params:{phoneId:''}, isArray:true},
//      get: {method:'JSONP', params:{phoneId:''}, isArray:true}
//    });
//}]);



.factory('Flickr', function($resource, $q) {
  var photosPublic = $resource('http://api.flickr.com/services/feeds/photos_public.gne',
      { format: 'json', jsoncallback: 'JSON_CALLBACK' },
      { 'load': { 'method': 'JSONP' } });

  return {
    search: function(query) {
      var q = $q.defer();
      photosPublic.load({
        tags: query
      }, function(resp) {
        q.resolve(resp);
      }, function(err) {
        q.reject(err);
      })

      return q.promise;
    }
  }
})

.controller('FlickrCtrl', function($scope, Flickr) {

  var doSearch = ionic.debounce(function(query) {
    Flickr.search(query).then(function(resp) {
      $scope.photos = resp;
      console.log('==== q: '+query);
    });
  }, 500);

  $scope.search = function() {
    doSearch($scope.query);
  }

})

.directive('pushSearch', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var amt, st, header;

      $element.bind('scroll', function(e) {
        if(!header) {
          header = document.getElementById('search-bar');
        }
        st = e.detail.scrollTop;
        if(st < 0) {
          header.style.webkitTransform = 'translate3d(0, 0px, 0)';
        } else {
          header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
        }
      });
    }
  }
})

.directive('photo', function($window) {
  return {
    restrict: 'C',
    link: function($scope, $element, $attr) {
      var size = ($window.outerWidth / 3) - 2;
      $element.css('width', size + 'px');
      console.log('==== size: '+size);
    }
  }
});