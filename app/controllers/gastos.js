import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),

  addNewGasto: computed('newGasto', function(){
    return this.get('newGasto')
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

  currentAdmin: computed('store', 'currentUser', function(){
    return DS.PromiseObject.create({
      promise: this.get('currentUser.account').then((account)=>{
          return account;
      })
    });
  }),

  actions: {
		addGasto(){
			if(this.get('addNewGasto')) {
				this.set('addNewGasto', false)
			} else {
				this.set('addNewGasto', true)
			}
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
