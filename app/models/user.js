import DS from 'ember-data';
import { computed } from "@ember/object";
import { isBlank } from '@ember/utils';
import moment from 'moment';

export default DS.Model.extend({
    uid: DS.attr('string'),
    nombre: DS.attr('string'),
    apellidoPaterno: DS.attr('string'),
    apellidoMaterno: DS.attr('string'),
    telefono: DS.attr('string'),
    email: DS.attr('string'),
    direccion: DS.attr('string'),

    fechaRegistro: DS.attr('string'),
    fechaURegistro: computed('fechaRegistro', function () {
    	return (!isBlank(this.get('fechaRegistro'))) ? moment.utc(this.get('fechaRegistro')).unix() : 0;
	  }).meta({ serialize: true }),
});
