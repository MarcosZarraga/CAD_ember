import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
	store: service(),

	addNewPago: computed('newPago', function(){
		return this.get('newPago')
	}),

	newPago: computed('store', function(){
		return this.store.createRecord('payment')
	}),

	allPagos: computed('store', function(){
		return this.store.findAll('payment')
	}),

	actions: {
		addPago(){
			this.set('addNewPago', false)
		}
	}
});
