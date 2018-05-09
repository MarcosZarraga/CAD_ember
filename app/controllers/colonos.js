import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {isBlank} from '@ember/utils';

export default Ember.Controller.extend({
  currentUser: service(),
	store: service(),
  newColono: false,
  edtColono: null,

  // Permite desplegar pantalla de agregar colono
	addNewColono: computed('newColono', function(){
		return this.get('newColono')
	}),

  // Obteniendo unidad actual con respecto al colono
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
    addColono() {
      if(!isBlank(this.get('edtColono'))){
          this.set('edtColono', null)
      }

      if(this.get('addNewColono')) {
        this.set('addNewColono', false)
      } else {
        this.set('addNewColono', true)
      }
    },

    // Cambio de pantalla a edición
		editColono(colono) {
      this.send('addColono')
      this.set('edtColono', colono)
		},

    // Eliminando colono
		deleteColono(colono){
			colono.destroyRecord()
		},

    // Cerrando sesión
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
