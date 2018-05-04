import DS from 'ember-data';
import { computed } from "@ember/object";
import { isBlank } from '@ember/utils';
import moment from 'moment';

export default DS.Model.extend({
    titulo: DS.attr('string'),
    descripcion: DS.attr('string'),
    fechaCierre: DS.attr('string'),

    unidadHab: DS.belongsTo('unit'),
    administrador: DS.belongsTo('administrator'),

    preguntas: DS.hasMany('question'),

    instancias: DS.hasMany('survey'),

    respondidas: computed('instancias.@each.respondida', function() {
      let sum = 0;
      this.get('instancias').forEach((instancia) => {
        if(instancia.get('respondida'))
        sum += 1;
      });
      return sum;
    }).meta({ serialize: true }),
});
