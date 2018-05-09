import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {isBlank} from '@ember/utils';

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),

  // Obteniendo la unidad a partir del administrador
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
    // Eliminando alerta
    deleteAlerta(alerta){
      alerta.destroyRecord()
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
