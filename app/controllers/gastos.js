import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),

  // Creando gasto
  addNewGasto: computed('newGasto', function(){
    return this.get('newGasto')
  }),

  // Obteniendo unidad de acuerdo al administrador
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

  // Obteniendo al administrador actual
  currentAdmin: computed('store', 'currentUser', function(){
    return DS.PromiseObject.create({
      promise: this.get('currentUser.account').then((account)=>{
          return account;
      })
    });
  }),

  actions: {
    // Cambio de pantalla
		addGasto(){
			if(this.get('addNewGasto')) {
				this.set('addNewGasto', false)
			} else {
				this.set('addNewGasto', true)
			}
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
