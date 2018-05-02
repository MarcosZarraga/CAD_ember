import Ember from 'ember';
import { inject as service } from "@ember/service";
import {computed} from '@ember/object';
import {isBlank} from '@ember/utils';

export default Ember.Component.extend({
	session: service(),
  firebase: service('firebaseApp'),

	newServicio: computed('store', function(){
		return this.get('store').createRecord('service')
	}),

	actions : {
		addServicio(servicio){
			servicio.set('unidadHab', this.get('currentUnit'));
			servicio.save().then(()=>{
				this.get('currentUnit.servicios').then((serviceList)=>{
					serviceList.pushObject(servicio)
					serviceList.save().then(()=>{
						this.get('currentUnit').then((currentUnit)=>{
							currentUnit.save().then(()=>{
								this.sendAction('addServicio')
							})
						})
					})
				})
			})
		},

		cancel(){
			this.sendAction('addServicio')
		}
	}
});
