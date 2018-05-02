import Ember from 'ember';
import { inject as service } from "@ember/service";
import {computed} from '@ember/object';
import {isBlank} from '@ember/utils';
import moment from 'moment';

export default Ember.Component.extend({
  session: service(),
  firebase: service('firebaseApp'),

  newGasto: computed('store', function(){
    return this.get('store').createRecord('spending')
  }),

  actions : {
		addGasto(gasto){
      gasto.set('administrador', this.get('admin'));
      gasto.set('unidadHab', this.get('currentUnit'));
		  gasto.set('fecha', moment().format())
			gasto.save().then(()=>{
          this.get('currentUnit.gastos').then((spendingList)=>{
            spendingList.pushObject(gasto)
						spendingList.save().then(()=>{
						    this.get('currentUnit').then((currentUnit)=>{
								currentUnit.save().then(()=>{
								      this.sendAction('addGasto')
								})
							})
						})
				})
			})
		},

		cancel(){
			this.sendAction('addGasto')
		}
	}

});
