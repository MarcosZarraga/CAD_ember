import Ember from 'ember';
import { inject as service } from "@ember/service";

export default Ember.Controller.extend({
    currentUser: service(),

    actions: {
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
