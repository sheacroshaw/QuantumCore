'use strict';

angular.module('quantumRApp', ['shoppinpal.mobile-menu','ui.bootstrap', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/pre_shift', {
        templateUrl: 'views/pre_shift.html',
        controller: 'PreShiftCtrl'
      })
      .when('/shift', {
        templateUrl: 'views/shift.html',
        controller: 'ShiftCtrl'
      })
      .when('/hole', {
        templateUrl: 'views/hole.html',
        controller: 'HoleCtrl'
      })
      .when('/activities', {
        templateUrl: 'views/activities.html',
        controller: 'ActivitiesCtrl'
      })
      .when('/consumables', {
        templateUrl: 'views/consumables.html',
        controller: 'ConsumablesCtrl'
      })
      .when('/assets', {
        templateUrl: 'views/assets.html',
        controller: 'AssetsCtrl'
      })
      .when('/notes', {
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl'
      })
      .when('/review', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/Hole_Log', {
        templateUrl: 'views/Hole_Log.html',
        controller: 'HoleLogCtrl'
      })
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl'
      })
      .when('/maint', {
        templateUrl: 'views/maint.html',
        controller: 'MaintCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
