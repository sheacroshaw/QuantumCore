'use strict';

angular.module('quantumRApp')
  .directive('assetselect', function () {
    return {
      templateUrl: './template/assetselect.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

        var asset = function(){
        this.name = null;
        this.unit = null;
        this.hours = null;
        this.Fuel_Input = 0;
        this.Water_Input = 0;
        this.Rental = 0;
        this.Unit_Number = null;
    };

  	    scope.addCustomAsset = function () {
  	    	scope.customAssets.push(new asset());
  	    };

        scope.removeCustomAsset = function(index){
          scope.customAssets.splice(index,1);
        }

      }//end link
    };
  });
