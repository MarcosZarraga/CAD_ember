import Ember from 'ember';
import {inject as service} from "@ember/service";
import { isBlank } from '@ember/utils';

export default Ember.Route.extend({
    session: service(),
    currentUser: service(),

    // Ir a iniciar sesión si la sesión no está iniciada
    beforeModel(){
      this.get('currentUser.account').then((account)=>{
        // console.log(account)
        // debugger
        if(isBlank(account)){
          // debugger
          if(this.get('session.isAuthenticated')){
              this.get('session').close();
          }
          this.transitionTo('login')
        }
      })
    },

    // El modelo de esta vista es la lista de colonos de la unidad
    model() {
      return this.get('currentUser.account').then((account)=>{
        return this.get('store').findRecord('unit', account.get('currentUnit')).then((theUnit)=>{
          return theUnit.get('colonos').then((settlerList)=>{
            // console.log(settlerList)
            return settlerList
          })
        })
      })
    }
});
