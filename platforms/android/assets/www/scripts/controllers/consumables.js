'use strict';

angular.module('quantumRApp')
  .controller('ConsumablesCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {

    $scope.manufacturers = [];

    var consumable = function(con){
        this.id = con.id || null;
        this.Description = con.Description || null;
        this.qty = null;
        this.Cost_Code = con.Name || null;
    };
    
    $scope.consumablesList = WebServiceData.getWebServiceData().consumables;
    $scope.consumables = Appdata.getConsumables();

//    console.log("The Root c", WebServiceData.getWebServiceData());


    WebServiceData.getCodeObjFromDB();
    $scope.consumablesList = WebServiceData.getCodes().consumables;
console.log("Consumable List", $scope.consumablesList);
    
    if (!$scope.consumablesList) { 
        console.log("undefined consu");
        $scope.consumablesList = [];
    }


    //add the std codes to the ones that may be on the contract
    var codesAndStandards = WebServiceData.getCodes();
    console.log("Standard consumables", codesAndStandards);
    if( codesAndStandards.standardCodes 
        && codesAndStandards.standardCodes.consumables
        && typeof  codesAndStandards.standardCodes.consumables === 'object') {
        
        $scope.consumablesList = $scope.consumablesList.concat(codesAndStandards.standardCodes.consumables);

        var inlist;
        for (var c in $scope.consumablesList) {
            inlist = ($scope.manufacturers.indexOf($scope.consumablesList[c].Manufacturer) === -1);
            if (inlist){
                $scope.manufacturers.push($scope.consumablesList[c].Manufacturer);
            }

        }
    }    
    
    $scope.addConsumable = function(con){
        $scope.consumables.push(new consumable(con));
    };
    $scope.removeConsumable = function(index){
        $scope.consumables.splice(index,1);
    };

    $scope.addCustomConsumable = function(){
        $scope.consumables.push({
            Description: "", 
            Units : 0,
            isCustom : true,
            Cost_Code : ''
        });
    }

  }]);
