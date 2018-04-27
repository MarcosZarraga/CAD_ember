import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
  currentUser: service(),
	store: service(),

	addNewColono: computed('newColono', function(){
		return this.get('newColono')
	}),

	currentUnit: computed('store', 'currentUser', function(){
		return DS.PromiseObject.create({
			promise: this.get('currentUser.account').then((account)=>{
				return this.get('store').findRecord('unit', account.get('currentUnit')).then(function(theUnit){
					console.log(theUnit)
					return theUnit;
				})
			})
		});
	}),

	actions: {
		addColono(){
			this.set('addNewColono', false)
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
