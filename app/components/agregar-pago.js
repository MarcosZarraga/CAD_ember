import Ember from 'ember';
import { inject as service } from "@ember/service";
import {computed} from '@ember/object';
import moment from 'moment';

export default Ember.Component.extend({
	session: service(),
	firebase: service('firebaseApp'),

	newPago: computed('store', function(){
		return this.get('store').createRecord('payment')
	}),

	settlerList: computed('store', 'currentUnit', function(){
		return DS.PromiseObject.create({
			promise: this.get('currentUnit').then((currentUnit)=>{
				return currentUnit.get('colonos').then((colonosList)=>{
					return colonosList;
				})
			})
		})
	}),

	actions : {
		addPago(pago){
				pago.set('colono', this.get('selectedColono'));
				pago.set('unidadHab', this.get('currentUnit'));
				pago.set('fecha', moment().format())
				pago.save().then(()=>{
					this.get('store').findRecord('settler', this.get('selectedColono.id')).then((colono)=>{
						colono.get('pagos').then((pagosList)=>{
							pagosList.pushObject(pago)
							pagosList.save().then(()=>{
								colono.save().then(()=>{
									//debugger
									this.get('currentUnit.pagos').then((paymentList)=>{
										paymentList.pushObject(pago)
										//debugger
										paymentList.save().then(()=>{
											this.get('currentUnit').then((currentUnit)=>{
												currentUnit.save().then(()=>{
													//debugger
													this.sendAction('addPago')
												})
											})
										})
									})
								})
							})
						})
					})
			})
		},

		cancel(){
			this.sendAction('addPago')
		}
	}
});
