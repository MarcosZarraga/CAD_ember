import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    // Agregando pregunta a la lista de respuestas de la pregunta
    addRespuesta(pregunta){
      pregunta.get('respuestas').createRecord()
    },
  }
});
