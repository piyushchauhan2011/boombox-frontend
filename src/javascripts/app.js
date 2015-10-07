var jQuery = require('jquery/dist/jquery');
window.jQuery = jQuery;
var angular = require('angular');
angular.module('templates', []);
require('./templates');
require('angular-animate/angular-animate');
require('angular-aria/angular-aria');
require('angular-cookies/angular-cookies');
require('angular-strap/dist/angular-strap');
require('angular-strap/dist/angular-strap.tpl');
require('angular-datatables/node_modules/datatables/media/js/jquery.dataTables');
require('angular-datatables/dist/angular-datatables');
var uirouter = require('angular-ui-router');
var app = angular.module('app', ['templates', 'ngAnimate', 'ngAria', 'ngCookies', uirouter, 'mgcrea.ngStrap', 'datatables']);

// Configuration
var Config = require('./config');
app.config(Config);

// All the Services

// All the Directives

// All the Controllers
var AppCtrl = require('./controllers/appCtrl');
var UsersCtrl = require('./controllers/usersCtrl');
var UserCtrl = require('./controllers/userCtrl');
var ArtistsCtrl = require('./controllers/artistsCtrl');
var ArtistCtrl = require('./controllers/artistCtrl');

app.controller('AppCtrl', AppCtrl);
app.controller('UsersCtrl', UsersCtrl);
app.controller('UserCtrl', UserCtrl);
app.controller('ArtistsCtrl', ArtistsCtrl);
app.controller('ArtistCtrl', ArtistCtrl);