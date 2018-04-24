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
		return this.store.findAll('housing-unit');
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
					console.log(userId)

					let context = this;
					return new Promise(function (resolve, reject){
						context.filterEqual(context.store, 'administrator', { 'uid': userId}, function(admin){
						console.log(admin)
							return resolve(admin[0])
						})
					}).then((user)=>{
						console.log(user)
						debugger
						user.set('unidad', this.get('selectedUnit.id'));
						user.save();
						//toastr.success('Bienvenido, ' + userInst.get('nombre'));
						this.transitionToRoute('inicio');
					})
				}).catch(()=>{
					userId =  this.get('session.currentUser.uid');
					console.log(userId)

					let context = this;
					return new Promise(function (resolve, reject){
						context.filterEqual(context.store, 'administrator', { 'uid': userId}, function(admin){
						console.log(admin)
						return resolve(admin[0])

						})
					}).then((user)=>{
						console.log(user)
						debugger
						user.set('unidad', this.get('selectedUnit.id'));
						user.save();
						//toastr.success('Bienvenido, ' + userInst.get('nombre'));
						this.transitionToRoute('inicio');
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

