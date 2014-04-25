angular.module('starter.services', ['ngResource'])

.factory('Site', ['$resource', function($resource) {

  return $resource( 'http://localhost:3000/moboapi/v1/sites/:siteId.json',
      { siteId: '@siteId' }, {
        contract: {
          method: 'GET',
          params: { siteId: '@siteId' },
          isArray: false
        }
      } );

}])

.factory('Payment', ['$resource', function($resource) {
  return $resource('http://localhost:3000/moboapi/v1/sites/:siteId/payments/:paymentId.json',
      {siteId:'@siteId', paymentId:'@paymentId'},{
        query: { method: 'GET', isArray: true }
      });
}])

.factory('Payments', ['$resource', function($resource) {
  return $resource('http://localhost:3000/moboapi/v1/sites/:siteId/payments.json',
      {siteId:'@siteId'},{
        query: { method: 'GET', isArray: true }
      });
}])

.factory('SiteSearch', function($resource, $q) {

  var sites = $resource('http://localhost:3000/moboapi/v1/sites/93.json',
      { format: 'json' },
      { 'load': { 'method': 'GET' } });

  return {
    biller_search: function(biller_query) {
      var q = $q.defer();
      sites.load({
        payee_query: biller_query
      }, function(resp) {
        q.resolve(resp);
      }, function(err) {
        q.reject(err);
      })

      return q.promise;
    }
  }
})


.factory('PaycodeSearch', function($resource, $q) {
  var paycodes = $resource('https://alpha3-www.paynearme.com/api/view_payment.json?uid=1a&version=2.0&',
      { format: 'json', callback: 'JSON_CALLBACK' },
      { 'load': { 'method': 'JSONP' } });

  return {
    paycode_search: function(paycode_query) {
      var q = $q.defer();
      paycodes.load({
        pnm_order_crid: paycode_query
      }, function(resp) {
        q.resolve(resp);
      }, function(err) {
        q.reject(err);
      })

      return q.promise;
    }
  }
})

.factory('GetUU', function() {
  var uploadurl = "http://localhost/upl";
  return  {
    query: function() {
      return uploadurl;
    }
  }
})

.directive('pushSearch', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var amt, st, header;

      $element.bind('scroll', function(e) {
        if(!header) {
          header = document.getElementById('biller-search-bar');
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

.directive('site', function($window) {
  return {
    restrict: 'C',
    link: function($scope, $element, $attr) {
      var size = ($window.outerWidth / 3) - 2;
      $element.css('width', size + 'px');
    }
  }
});