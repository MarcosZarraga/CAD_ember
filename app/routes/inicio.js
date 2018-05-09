import Ember from 'ember';
import {inject as service} from "@ember/service";
import { isBlank } from '@ember/utils';

export default Ember.Route.extend({
    session: service(),
    currentUser: service(),

    // Ir a iniciar sesión si la sesión no está iniciada
    beforeModel(){
      this.get('currentUser.account').then((account)=>{
        if(isBlank(account)){
          if(this.get('session.isAuthenticated')){
              this.get('session').close();
          }
          this.transitionTo('login')
        }
      })
        // return this.get('session').fetch().then(() => {
        //     if (!this.get('session.isAuthenticated'))
        //         this.transitionTo('login')
        // }).catch((error) => {
        //     console.log(this.get('session'))
        //     console.log(error)
        // })
      },

      // El modelo de esta vista es la unidad habitacional
      model() {
        return this.get('currentUser.account').then((account)=>{
          return this.get('store').findRecord('unit', account.get('currentUnit')).then((theUnit)=>{
            //console.log(theUnit)
            return theUnit
          })
        })
      }
});
