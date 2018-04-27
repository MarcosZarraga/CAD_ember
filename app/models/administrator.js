import DS from 'ember-data';
import User from './user';
import { computed } from '@ember/object';

export default User.extend({
	unidadHab: DS.hasMany('unit'),
	currentUnit: DS.attr('string')
	// unidad: DS.attr('string'),
 	// unidadHab: computed('unidad', function(){
 	// return this.store.findRecord('unit', this.get('unidad'))
 	// })

});
