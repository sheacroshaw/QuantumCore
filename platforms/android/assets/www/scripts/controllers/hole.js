'use strict';

angular.module('quantumRApp')
  .controller('HoleCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {
	 var hole = function() {
	 	this.number = this.size = this.angle = this.angleDegree =
	 	this.runs = this.startingDepth = this.endingDepth = this.totalDepth = null; 
	 };

	 var bit = function(){
	 	this.Depth_From = this.Depth_To = this.description = this.type = this.size = this.serial = null;
	 };

	 $scope.information = Appdata.getHole().information;
	 $scope.bit = Appdata.getHole().bit;

	 $scope.addInformation = function(){
	 	$scope.information.push(new hole());
	 };
	 $scope.addBit = function(){
	 	$scope.bit.push(new bit());
	 };
	 $scope.removeBit = function(index){
	 	$scope.bit.splice(index,1);
	 };
	 $scope.removeInformation = function(index){
	 	$scope.information.splice(index,1);
	 };

  }]);