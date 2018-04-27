import Ember from 'ember';
import { Promise as EmberPromise } from 'rsvp';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';

export default Ember.Service.extend({
  session: service(),
	store: service(),
	_account: "hola",

	isAuthenticated: alias('session.isAuthenticated'),

	account: computed('isAuthenticated', '_account', {
		get() {
			return this.get('session').fetch().catch(()=>{
			}).then(()=>{
				if (this.get('isAuthenticated')) {
					//this._retreiveAccount()
					//devolver cuenta
					return this.get('store').query('administrator', {
						orderBy: 'uid',
						equalTo: this.get('session.currentUser.uid'),
						limitToLast: 1
					}).then((account) => {
						let _account = account.get('firstObject');
						return _account;
					});
				}
				else {
				this.set('_account', null)
				return null
				}
			});

		}

	}),


});
