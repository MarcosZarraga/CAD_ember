import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
	store: service(),

	addNewColono: computed('newColono', function(){
		return this.get('newColono')
	}),

	newColono: computed('store', function(){
		return this.store.createRecord('settler')
	}),

	allColonos: computed('store', function(){
		return this.store.findAll('settler')
	}),

	actions: {
		addColono(){
			this.set('addNewColono', false)
		}
	}
});
