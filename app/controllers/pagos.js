import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
	currentUser: service(),
	store: service(),

	// Creando nuevo pago
	addNewPago: computed('newPago', function(){
		return this.get('newPago')
	}),

	// Obteniendo unidad actual
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
		// Cambio de pantalla a agregar pago
		addPago(){
			if(this.get('addNewPago')) {
				this.set('addNewPago', false)
			} else {
				this.set('addNewPago', true)
			}
		},

		// Cerrar Sesión
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
