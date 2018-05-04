import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),

  addNewEncuesta: computed('newEncuesta', function(){
    return this.get('newEncuesta')
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
    addEncuesta(){
			if(this.get('addNewEncuesta')) {
				this.set('addNewEncuesta', false)
			} else {
				this.set('addNewEncuesta', true)
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
