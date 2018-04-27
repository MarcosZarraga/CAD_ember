import Ember from 'ember';
import { inject as service } from "@ember/service";
import { isBlank } from '@ember/utils';
import { isNone } from '@ember/utils';
import { computed } from '@ember/object';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Controller.extend(FindQuery, {
	session: service(),
	firebase: service('firebaseApp'),

	unidades: computed(function(){
		return this.store.findAll('unit');
	}),

	actions: {
		iniciarSesion(){
			let email = this.get('email');
			if(isBlank(this.get('email'))){
				//window.Materialize.toast('Introduce tu correo electrónico', 2000);
				console.log('Falta email')
				return;
			}
			let password = this.get('password');
			if(isBlank(this.get('password'))){
				//window.Materialize.toast('Introduce tu contraseña', 2000);
				console.log('Falta pass')
				return;
			}
			if(isNone(this.get('selectedUnit'))){
				console.log('Selecciona unidad')
				return;
			}

			this.get('session').open('firebase', {
				provider: 'password',
				email: email,
				password: password
			}).then((user)=>{
				let userId;

				this.get('session').fetch().then(()=>{
					userId =  this.get('session.currentUser.uid');
					// this.get('store').findRecord('unit', this.get('selectedUnit.id'))
					let context=this;
					return new Promise(function(resolve, reject){
						context.filterEqual(context.store, 'unit', {'id': context.get('selectedUnit.id')}, function(filteredUnit){
							return resolve(filteredUnit[0])
						})
					}).then((unit)=>{
						// this.get('store').findRecord('administrator', userId).
						let context=this;
						return new Promise(function(resolve, reject){
							context.filterEqual(context.store, 'administrator', {'uid': userId}, function(filteredAdmin){
								return resolve(filteredAdmin[0])
							})
						}).then((admin)=>{
							if(unit.get('admin1') == admin.get('id')){
								admin.currentUnit=unit.get('id');
								admin.save().then(()=>{

									console.log(admin)
									debugger
									this.transitionToRoute('inicio');
								})
							} else {
								if(unit.get('admin2') == admin.get('id')) {
									//toastr.success('Bienvenido, ' + userInst.get('nombre'));
									admin.currentUnit=unit.get('id');
									admin.save().then(()=>{

										console.log(admin)
										debugger
										this.transitionToRoute('inicio');
									})
								} else {
									console.log('Admin no valido')
									debugger
									this.send('signOut')
								}
							}
						})
					})

				}).catch(()=>{
					userId =  this.get('session.currentUser.uid');
					// this.get('store').findRecord('unit', this.get('selectedUnit.id'))
					let context=this;
					return new Promise(function(resolve, reject){
						context.filterEqual(context.store, 'unit', {'id': context.get('selectedUnit.id')}, function(filteredUnit){
							return resolve(filteredUnit[0])
						})
					}).then((unit)=>{
						// this.get('store').findRecord('administrator', userId).
						let context=this;
						return new Promise(function(resolve, reject){
							context.filterEqual(context.store, 'administrator', {'uid': userId}, function(filteredAdmin){
								return resolve(filteredAdmin[0])
							})
						}).then((admin)=>{
							if(unit.get('admin1') == admin.get('id')){
								admin.currentUnit=unit.get('id');
								admin.save().then(()=>{

									console.log(admin)
									debugger
									this.transitionToRoute('inicio');
								})
							} else {
								if(unit.get('admin2') == admin.get('id')) {
									//toastr.success('Bienvenido, ' + userInst.get('nombre'));
									admin.currentUnit=unit.get('id');
									admin.save().then(()=>{

										console.log(admin)
										debugger
										this.transitionToRoute('inicio');
									})
								} else {
									console.log('Admin no valido')
									debugger
									this.send('signOut')
								}
							}
						})
					})

				})

			}).catch((error)=>{
				console.log(error);
			})
		},

		createXUser() {
			let email = "alex_unit7@guha.mx";
			let password = "123123";
			this.get('firebase').auth().createUserWithEmailAndPassword(email, password).then((user) => {
				//	console.log(user.uid)
				//debugger
				this.get('store').createRecord('administrator', {
					nombre: 'Alex',
					apellidoPaterno: 'M.',
					apellidoMaterno: 'L.',
					email: email,
					uid: user.uid,
				}).save();
			}).then(()=>{
				//toastr.success('Registro exitoso');
				console.log('Usuario registrado')
			}).catch((error)=>{
				console.log(error);
			})
		},

		signOut(){
			this.get('session').close();
			console.log('Sesion cerrada');
		}
	}
});
