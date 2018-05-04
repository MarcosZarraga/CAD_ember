import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addRespuesta(pregunta){
      pregunta.get('respuestas').createRecord()
    },
  }
});
