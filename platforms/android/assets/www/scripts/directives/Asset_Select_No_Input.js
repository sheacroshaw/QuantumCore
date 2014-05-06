'use strict';

angular.module('quantumRApp')
  .directive('assetSelectNoInput', function () {
    return {
      templateUrl: './template/asset_no_input.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      	
      }
    };
  });
