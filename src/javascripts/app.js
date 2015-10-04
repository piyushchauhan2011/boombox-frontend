var angular = require('angular');
angular.module('templates', []);
require('./templates');
require('angular-animate/angular-animate');
require('angular-aria/angular-aria');
require('angular-strap/dist/angular-strap');
require('angular-strap/dist/angular-strap.tpl');
var uirouter = require('angular-ui-router');
var app = angular.module('app', ['templates', 'ngAnimate', 'ngAria', uirouter, 'mgcrea.ngStrap']);

// Configuration
var Config = require('./config');
app.config(Config);

// All the Services

// All the Directives

// All the Controllers
var AppCtrl = require('./controllers/appCtrl');
var UsersCtrl = require('./controllers/usersCtrl');
var ArtistsCtrl = require('./controllers/artistsCtrl');
var ArtistCtrl = require('./controllers/artistCtrl');

app.controller('AppCtrl', AppCtrl);
app.controller('UsersCtrl', UsersCtrl);
app.controller('ArtistsCtrl', ArtistsCtrl);
app.controller('ArtistCtrl', ArtistCtrl);