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
				let userInst;

				this.get('session').fetch().then(()=>{
					userId =  this.get('session.currentUser.uid');
					//console.log(userId)

					let context = this;
					return new Promise(function (resolve, reject){
						context.filterEqual(context.store, 'unit', { 'id': context.get('selectedUnit.id')}, function(selectedUnit){
							//console.log(selectedUnit)
							return resolve(selectedUnit[0])
						})
					}).then((unit)=>{
						//console.log(unit)
						debugger

						let context2 = this;
						return new Promise(function(resolve, reject){
							context2.filterEqual(context2.store, 'administrator', { 'uid': userId}, function(admin){
								//console.log(admin)
								return resolve(admin[0])
							})
						}).then((user)=>{
							//console.log(user)
							debugger
							if(unit.get('admin1') == user.get('id') || unit.get('admin2') == user.get('id')) {
								//toastr.success('Bienvenido, ' + userInst.get('nombre'));
								this.transitionToRoute('inicio');
							} else {
								console.log('Admin no valido')
								this.send('signOut')
							}
						})

					})
					
				}).catch(()=>{
					userId =  this.get('session.currentUser.uid');
					//console.log(userId)

					let context = this;
					return new Promise(function (resolve, reject){
						context.filterEqual(context.store, 'unit', { 'id': context.get('selectedUnit.id')}, function(selectedUnit){
							//console.log(selectedUnit)
							return resolve(selectedUnit[0])
						})
					}).then((unit)=>{
						//console.log(unit)
						debugger

						let context2 = this;
						return new Promise(function(resolve, reject){
							context2.filterEqual(context2.store, 'administrator', { 'uid': userId}, function(admin){
								console.log(admin)
								return resolve(admin[0])
							})
						}).then((user)=>{
							//console.log(user.get('id'))
							//debugger
							if(unit.get('admin1') == user.get('id') || unit.get('admin2') == user.get('id')) {
								//toastr.success('Bienvenido, ' + userInst.get('nombre'));
								this.transitionToRoute('inicio');
							} else {
								console.log('Admin no valido')
								this.send('signOut')
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

