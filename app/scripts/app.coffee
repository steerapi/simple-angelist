'use strict'

require "./extensions/capitalize.coffee"
require "./modules/preloader.coffee"
require "./modules/syncfocus.coffee"

angular
  .module('simplecareersApp', [
    'ui.router',
    'restangular',
    'famous.angular',
    'LocalStorageModule',
    'preloader',
    'syncFocusWith'
  ])
  .config([
    '$locationProvider'
    'RestangularProvider'
  	'$stateProvider'
    '$urlRouterProvider'
    '$famousStateProvider'
    '$famousUrlRouterProvider'
  	($locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider, $famousStateProvider, $famousUrlRouterProvider, config) ->
      $locationProvider.html5Mode(false);

      RestangularProvider.setRestangularFields
        id: "objectId"
      RestangularProvider.setBaseUrl "https://api.parse.com/1/"
      RestangularProvider.setDefaultHeaders
        "X-Parse-Application-Id": "WFC9425UM5gV4wMLcWolWP45RlanlwaoMBT2H5Mm"
        "X-Parse-REST-API-Key": "cZ4iL7TOatIAZAzsrOe9n69HlI75jlGYyQHoAzj8"
      RestangularProvider.addResponseInterceptor (data, operation, what, url, response, deferred)=>
        if operation=="getList"
          return data.results
        return data

      # Deal with missing trailing slash
      # $urlRouterProvider.rule ($injector, $location) ->
      #   path = $location.path()
      #   search = $location.search()
      #   if path[path.length - 1] isnt "/"
      #     if Object.keys(search).length is 0
      #       path + "/"
      #     else
      #       params = []
      #       angular.forEach search, (v, k) ->
      #         params.push k + "=" + v
      #         return
      #
      #       path + "/?" + params.join("&")

      $urlRouterProvider.otherwise "/login"

      # $famousUrlRouterProvider.when "/login","login"
      # $famousUrlRouterProvider.when "/profile","profile"
      # $famousUrlRouterProvider.when "/job","job"
      # $famousUrlRouterProvider.otherwise "login"
      #
      # $famousStateProvider
      # .state("login", {
      #   url: "/login",
      #   templateUrl: "views/login/login.html",
      #   controller: "LoginCtrl",
      #   inTransitionFrom : "inTransitionFunction($callback)",
      #   outTransitionTo: "outTransitionFunction($callback)"
      # })
      # .state("profile", {
      #   url: "/profile",
      #   templateUrl: "views/profile/profile.html",
      #   controller: "ProfileCtrl",
      #   inTransitionFrom : "inTransitionFunction",
      #   outTransitionTo: "outTransitionFunction"
      # })
      # .state("job", {
      #   url: "/job",
      #   templateUrl: "views/job/job.html",
      #   controller: "JobCtrl",
      #   inTransitionFrom : "inTransitionFunction($callback)",
      #   outTransitionTo: "outTransitionFunction($callback)"
      # })


      $stateProvider
      .state('login',
        url: "/login",
        views:
          {
            'main': {
              templateUrl: "./views/login/login.html",
              controller: "LoginCtrl"
            }
          }
      )
      .state('profile',
        url: "/profile",
        views:
          {
            'main': {
              templateUrl: "./views/profile/profile.html",
              controller: "ProfileCtrl"
            }
          }
      )
      .state('job',
        url: "/job",
        views:
          {
            'main': {
              templateUrl: "./views/job/job.html",
              controller: "JobCtrl"
            }
          }
      )
      .state('detail',
        url: "/detail",
        views:
          {
            'main': {
              templateUrl: "./views/detail/detail.html",
              controller: "DetailCtrl"
            }
          }
      )
  ])

require "./controllers/app.coffee"
require "./controllers/login/login.coffee"
require "./controllers/profile/profile.coffee"
require "./controllers/detail/detail.coffee"
require "./controllers/detail/card.coffee"
require "./controllers/detail/question.coffee"
require "./controllers/job/job.coffee"
require "./controllers/job/jobcard.coffee"
require "./controllers/job/tutorial.coffee"

angular.bootstrap(document, ['simplecareersApp']);
