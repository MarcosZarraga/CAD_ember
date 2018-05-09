import Ember from 'ember';

export default Ember.Component.extend({

  actions : {
    // Cambio de pantalla
    cancel(){
      this.sendAction('addEncuesta')
    }

  }

});
