'use strict';

angular.module('quantumRApp')
  .directive('assetselect', function () {
    return {
      templateUrl: './template/assetselect.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

        var asset = function(){

       };

  	    scope.addCustomAsset = function () {
  	    	scope.customAssets.push({"id":13, "Rental":null, "Equipment_Name": null,"Unit_Number":null, "hours": null, "Fuel_Input": null, "Water_Input": null });

         
  	    };

        scope.removeCustomAsset = function(index){
          scope.customAssets.splice(index,1);
        }

      }//end link
    };
  });
