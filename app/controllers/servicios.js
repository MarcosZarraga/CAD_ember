import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
	store: service(),

	addNewServicio: computed('newServicio', function(){
		return this.get('newServicio')
	}),

	newServicio: computed('store', function(){
		return this.store.createRecord('service')
	}),

	allServicios: computed('store', function(){
		return this.store.findAll('service')
	}),

	actions: {
		addServicio(){
			this.set('addNewServicio', false)
		}
	}
});
