'use strict';

angular.module('quantumRApp')
  .controller('NotesCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {

    $scope.notes = Appdata.getNotes();

  }]);
