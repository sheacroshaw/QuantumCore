'use strict';

angular.module('quantumRApp')
  .controller('AssetsCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {
    var water = function(){
    	this.loads = this.tankSize = null;
    };
    var asset = function(){
    	this.name = null;
    	this.unit = null;
    	this.hours = null;
        this.Rental = 0;
        this.Unit_Number = null;
    };

    // $scope.assets = Appdata.getAssets().assets;
    // $scope.customAssets = Appdata.getAssets().customAssets;
    $scope.fuel = Appdata.getAssets().fuel;
    $scope.water = Appdata.getAssets().water;


    $scope.addCustomAsset = function () {
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

  

  }]);
