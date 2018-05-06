import DS from 'ember-data';
import { computed } from "@ember/object";
import { isBlank } from '@ember/utils';
import moment from 'moment';

export default DS.Model.extend({
  encuestaBase: DS.belongsTo('poll'),
  preguntas: DS.hasMany('question'),
  colono: DS.belongsTo('settler'),
  fechaRespuesta: DS.attr('string'),

  respondida: DS.attr('boolean', {
    defaultValue: false
  })

});
