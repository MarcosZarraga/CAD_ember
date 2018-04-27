import Ember from 'ember';
import { inject as service } from "@ember/service";
import {computed} from '@ember/object';

export default Ember.Component.extend({
	session: service(),
	firebase: service('firebaseApp'),

	newColono: computed('store', function(){
		return this.get('store').createRecord('settler')
	}),

	actions : {
		addColono(colono){
			this.get('firebase').auth().createUserWithEmailAndPassword(colono.get('email'), this.get('password')).then((colonoAuth) => {
				colono.set('uid', colonoAuth.uid)
				colono.set('unidadHab', this.get('currentUnit'))
				colono.save().then(()=>{
					this.get('currentUnit.colonos').then((colonosList)=>{
						console.log(colonosList)
						debugger
						colonosList.pushObject(colono)
						colonosList.save().then(()=>{
							this.get('currentUnit').then((currentUnit)=>{
									currentUnit.save().then(()=>{
											this.sendAction('addColono')
									})
							})
						})
					})
				})
			}).then(()=>{
				//toastr.success('Registro exitoso');
				console.log('Colono registrado en autenticacion')
			}).catch((error)=>{
				console.log(error);
			})
		}

	}

});
