import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
	currentUser: service(),
  store: service(),

	addNewServicio: computed('newServicio', function(){
		return this.get('newServicio')
	}),

	currentUnit: computed('store', 'currentUser', function(){
		return DS.PromiseObject.create({
			promise: this.get('currentUser.account').then((account)=>{
				return this.get('store').findRecord('unit', account.get('currentUnit')).then(function(theUnit){
					// console.log(theUnit)
					return theUnit;
				})
			})
		});
	}),

	actions: {
		addServicio(){
			if(this.get('addNewServicio')) {
				this.set('addNewServicio', false)
			} else {
				this.set('addNewServicio', true)
			}
		},

		deleteServicio(servicio){
			servicio.destroyRecord()
		},

		signOut(){
			this.get('currentUser.account').then((account)=>{
				account.set('currentUnit', null)
				account.save().then(()=> {
					this.get('session').close();
					this.transitionToRoute('login');
						 console.log('Sesion cerrada');
				})
			})
		}
	}
});
