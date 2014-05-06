'use strict';

angular.module('quantumRApp')
  .directive('locks', function () {
    return {
      templateUrl: './template/locked_details.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the lockedDetails directive');
      }
    };
  });
