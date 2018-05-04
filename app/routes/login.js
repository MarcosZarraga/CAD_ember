import Ember from 'ember';
import {inject as service} from "@ember/service";
import { isBlank } from '@ember/utils';

export default Ember.Route.extend({
      session: service(),
      currentUser: service(),

      beforeModel(){
        this.get('currentUser.account').then((account)=>{
          // console.log(account)
          // console.log(isBlank(account))
          // debugger
          if(isBlank(account)){
            if(this.get('session.isAuthenticated')){
                this.get('session').close();
            }
            this.transitionTo('login')
          } else {
            this.transitionTo('inicio')
          }
        })
      }
});
