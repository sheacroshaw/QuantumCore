'use strict';

angular.module('quantumRApp')
  .directive('settingSelect', function () {
    return {
      templateUrl: './template/setting_select.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      scope.$watch('selectedDetails.ids',function(newVal, oldVal){

          var prop;
          for (prop in scope.selectedDetails.ids){
              var valToSave = element.find('#'+prop +' option:selected').text();

              if (valToSave.search(/Select/) === -1)
                scope.selectedDetailsNames[prop + 'Name'] = valToSave;
              else 
                scope.selectedDetailsNames[prop + 'Name'] = '';

          }//end for

      },true)

      }
    };
  });