import DS from 'ember-data';
import { computed } from "@ember/object";
import { isBlank } from '@ember/utils';
import moment from 'moment';

export default DS.Model.extend({
  preguntas: DS.hasMany('question'),
  colono: DS.belongsTo('settler'),
  fechaCierre: DS.attr('string'),

  respondida: DS.attr('boolean', {
    defaultValue: false
  })

});
