import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    
    beforeModel(){
        return this.get('session').fetch().then(() => {
            if (!this.get('session.isAuthenticated'))
                this.transitionTo('login')
        }).catch((error) => {
            console.log(this.get('session'))
            console.log(error)
        })
	}
});
