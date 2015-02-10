'use strict';

angular.module('quantumRApp')
  .controller('AssetsCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {
    var water = function(){
    	this.loads = this.tankSize = null;
    };
    /*
    var asset = function(){
    	this.name = null;
    	this.unit = null;
    	this.hours = 0;
        this.Fuel_Input = 0;
        this.Water_Input = 0;
        this.Rental = 0;
        this.Unit_Number = null;
    };
*/


    // $scope.assets = Appdata.getAssets().assets;
    // $scope.customAssets = Appdata.getAssets().customAssets;
    $scope.fuel = Appdata.getAssets().fuel;
    $scope.water = Appdata.getAssets().water;


    $scope.addCustomAsset = function () {

        console.log("This is from assets.js ", $scope.customAssets);

    	$scope.customAssets.push(new asset());
    };
    $scope.addWater = function(){
    	$scope.water.push(new water());
    };
    $scope.removeWater = function(index){
    	$scope.water.splice(index,1);
    };

    //this is the added stuff for the assets.
    $scope.assets = Appdata.getAssets().assets;
    $scope.customAssets = Appdata.getAssets().customAssets;

    console.log("form the assets load",Appdata.getAssets() )

    $scope.checkit = function  () {
        WebServiceData.getAssets(function(tx,rs){

            if (rs.rows.length) {

               var dbAssets = JSON.parse(rs.rows.item(0).assets).assets;
               var dbCustomAssets = JSON.parse(rs.rows.item(0).assets).customAssets;

            console.log('INITIALLY', dbAssets, dbCustomAssets )

                combineValues(  $scope.assets,dbAssets);
                combineValues( $scope.customAssets, dbCustomAssets );

                var custs = [];
                for(var c in $scope.customAssets){
                    custs.push($scope.customAssets[c]['Equipment_Name']);
                }
                console.log('the custs', custs)

                for(var c in custs){
                    for (var s in  $scope.assets){

                        console.log(c, ' ==  ' ,$scope.assets[s]['Equipment_Name']);

                        if (custs[c] == $scope.assets[s]['Equipment_Name']) {
                            $scope.assets.splice($scope.assets.indexOf($scope.assets[s]),1);
                        }
                    }
                }

                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }
            else {
                console.log('nopeeeee')
            }
        });      
    }
    $scope.checkit();


    console.log("Here are the Assets", $scope.assets);


    function combineValues (daily,settings) {
        for (var s in settings){
            var found = false;
            for (var d in daily ){
                if (settings[s]['Equipment_Name'] == daily[d]['Equipment_Name']){
                    found = true;
                    daily[d]['Unit_Number'] = settings[s]['Unit_Number'];
                    daily[d]['Rental'] = settings[s]['Rental'];
                }
            }
            if(!found){
                daily.push(settings[s])
            } 
        }
    }

    function removeDuplicates(dupArray, field){
        var output = [],
            keys = [],
            key;

        angular.forEach(dupArray, function(item){
            key = item[field];
            if (keys.indexOf(key) === -1){
                keys.push(key);
                output.push(item);
            }
            
        });
        return output;
    }

  }]);
