'use strict'

require "./extensions/capitalize.coffee"

angular
  .module('simplecareersApp', [
    'ui.router',
    'restangular',
    'famous.angular'
  ])
  .config([
    '$locationProvider'
    'RestangularProvider'
  	'$stateProvider'
    '$urlRouterProvider'
  	($locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider, config) ->
      $locationProvider.html5Mode(false);        
      RestangularProvider.setRestangularFields
        id: "_id"
      RestangularProvider.setBaseUrl "http://simplecareers-test.apigee.net/angel/"
        
      $urlRouterProvider.otherwise "/app"
    
      $stateProvider
      .state('app',
        url: "/app",
        views: 
          {
            'main': {
              templateUrl: "/views/app.html",
              controller: "AppCtrl"
            }
          }
      )

  ])

require "./controllers/app.coffee"
require "./controllers/login/login.coffee"
require "./controllers/profile/profile.coffee"
require "./controllers/apply/apply.coffee"
require "./controllers/apply/question.coffee"
require "./controllers/detail/detail.coffee"
require "./controllers/job/job.coffee"
require "./controllers/job/jobcard.coffee"
require "./controllers/job/tutorial.coffee"

angular.bootstrap(document, ['simplecareersApp']);