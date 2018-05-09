import Ember from 'ember';
import { inject as service } from "@ember/service";
import {computed} from '@ember/object';
import moment from 'moment';

export default Ember.Component.extend({
	session: service(),
	firebase: service('firebaseApp'),

	// Creando nuevo colono
	newColono: computed('store', function(){
		return this.get('store').createRecord('settler')
	}),

	actions : {
		// Función de crear colono
		addColono(colono){
				// Creando usuario en servicio de autenticación de Firebase
			this.get('firebase').auth().createUserWithEmailAndPassword(colono.get('email'), this.get('password')).then((colonoAuth) => {
				// Rellenando datos de colono
				colono.set('uid', colonoAuth.uid)
				colono.set('unidadHab', this.get('currentUnit'))
				colono.set('fechaRegistro', moment().format())
				colono.save().then(()=>{
					this.get('currentUnit.colonos').then((colonosList)=>{
						//console.log(colonosList)
						//debugger
						// Guardando colono en lista de colonos de unidad
						colonosList.pushObject(colono)
						colonosList.save().then(()=>{
							this.get('currentUnit').then((currentUnit)=>{
									currentUnit.save().then(()=>{
										// Cambio de pantalla
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
		},

		// Cancelando creación de colono
		cancel(){
			this.sendAction('addColono')
		}

	}

});
