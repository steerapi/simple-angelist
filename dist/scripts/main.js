!function r(t,e,o){function n(s,u){if(!e[s]){if(!t[s]){var c="function"==typeof require&&require;if(!u&&c)return c(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var p=e[s]={exports:{}};t[s][0].call(p.exports,function(r){var e=t[s][1][r];return n(e?e:r)},p,p.exports,r,t,e,o)}return e[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)n(o[s]);return n}({1:[function(r){"use strict";var t;r("./controllers/app.coffee"),t=angular.module("simplecareersApp",["ui.router","restangular","famous.angular"]).config(["$locationProvider","RestangularProvider","$stateProvider","$urlRouterProvider",function(r,t,e,o){return r.html5Mode(!1),t.setRestangularFields({id:"_id"}),t.setBaseUrl("/api/data/"),o.otherwise("/app"),e.state("app",{url:"/app",views:{main:{templateUrl:"/views/app.html",controller:"AppCtrl"}}})}])},{"./controllers/app.coffee":2}],2:[function(r){"use strict";var t,e,o={}.hasOwnProperty,n=function(r,t){function e(){this.constructor=r}for(var n in t)o.call(t,n)&&(r[n]=t[n]);return e.prototype=t.prototype,r.prototype=new e,r.__super__=t.prototype,r};e=r("./ctrl"),t=function(r){function t(r){this.scope=r,t.__super__.constructor.call(this,this.scope)}return n(t,r),t.$inject=["$scope"],t}(e),angular.module("simplecareersApp").controller("AppCtrl",t)},{"./ctrl":3}],3:[function(r,t){"use strict";var e;e=function(){function r(r){var t,e,o,n;for(this.scope=r,n=_.functions(this),e=0,o=n.length;o>e;e++)t=n[e],"constructor"!==t&&(this.scope[t]=this[t]);this.scope.save=_.debounce(this.scope.save,1e3)}return r.$inject=["$scope"],r}(),t.exports=e},{}]},{},[1]);