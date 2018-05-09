import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {isBlank} from '@ember/utils';

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),
  viewingEncuesta: null,

  // Cambio de pantalla
  addNewEncuesta: computed('newEncuesta', function(){
    return this.get('newEncuesta')
  }),

  // Obteniendo unidad con respecto del administrador
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

  // Obteniendo administrador actual
  currentAdmin: computed('store', 'currentUser', function(){
    return DS.PromiseObject.create({
      promise: this.get('currentUser.account').then((account)=>{
          return account;
      })
    });
  }),

  actions: {
    // Cambio de pantalla
    addEncuesta(){
      if(!isBlank(this.get('viewingEncuesta'))){
          this.set('viewingEncuesta', null)
      }

			if(this.get('addNewEncuesta')) {
				this.set('addNewEncuesta', false)
			} else {
				this.set('addNewEncuesta', true)
			}
		},

    // Desplegando pantalla de visualización de encuesta
    viewEncuesta(encuesta) {
      this.send('addEncuesta')
      this.set('viewingEncuesta', encuesta)
    },

    // Cerrando Sesión
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
