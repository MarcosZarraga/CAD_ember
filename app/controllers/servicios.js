import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
	currentUser: service(),
  store: service(),

	// Creando servicio
	addNewServicio: computed('newServicio', function(){
		return this.get('newServicio')
	}),

	// Obteniendo unidad de acuerdo con el administrador actual
	currentUnit: computed('store', 'currentUser', function(){
		return DS.PromiseObject.create({
			promise: this.get('currentUser.account').then((account)=>{
				return this.get('store').findRecord('unit', account.get('currentUnit')).then(function(theUnit){
					// console.log(theUnit)
					return theUnit;
				})
			})
		});
	}),

	actions: {
		// Cambio de pantalla a agregar servicio
		addServicio(){
			if(this.get('addNewServicio')) {
				this.set('addNewServicio', false)
			} else {
				this.set('addNewServicio', true)
			}
		},

		// Borrar servicio
		deleteServicio(servicio){
			servicio.destroyRecord()
		},

		// Cerrar sesión
		signOut(){
			this.get('currentUser.account').then((account)=>{
				account.set('currentUnit', null)
				account.save().then(()=> {
					this.get('session').close();
					this.transitionToRoute('login');
						 console.log('Sesion cerrada');
				})
			})
		}
	}
});
