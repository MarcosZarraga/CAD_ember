import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {isBlank} from '@ember/utils';

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),

  // Obteniendo la unidad actual con respecto al administrador
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
    // Aprobar solicitud
    aprobar(solicitud){
      solicitud.set('aprobado', true);
      solicitud.save();
    },

    // Rechazar solicitud
    rechazar(solicitud){
      solicitud.set('aprobado', false);
      solicitud.save();
    },

    // Eliminar solicitud
    eliminar(solicitud){
      solicitud.destroyRecord()
    }

  }

});
