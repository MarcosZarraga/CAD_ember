import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pagos');
  this.route('gastos');
  this.route('colonos');
  this.route('calendario');
  this.route('encuestas');
  this.route('solicitudes');
  this.route('alertas');
  this.route('servicios');
  this.route('login');
});

export default Router;
