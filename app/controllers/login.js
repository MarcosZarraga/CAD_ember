import Ember from 'ember';
import { inject as service } from "@ember/service";
import { isBlank } from '@ember/utils';
import { isNone } from '@ember/utils';
import { computed } from '@ember/object';

export default Ember.Controller.extend({
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
				user.set('unidad', this.get('selectedUnit.id'))
				let userId;
				let userInst;
				this.get('session').fetch().then(()=>{
					userId =  this.get('session.currentUser.uid');
					return this.get('store').query('administrator', {
						equalTo: userId,
						orderBy: uid, 
						limitToLast: 1
					}).then((user)=>{
						userInst = user.get('firstObject');
						//toastr.success('Bienvenido, ' + userInst.get('nombre'));
						this.transitionToRoute('index');
					})
				}).catch(()=>{
					userId =  this.get('session.currentUser.uid');
					return this.get('store').query('administrator', {
						equalTo: userId,
						orderBy: uid, 
						limitToLast: 1
					}).then((user)=>{
						userInst = user.get('firstObject');
						//toastr.success('Bienvenido, ' + userInst.get('nombre'));
						this.transitionToRoute('index');
					})
				}).catch(()=>{
				})
			}).catch((error)=>{
				console.log(error);
			})
		},

		crearXUser() {
			let email = "alex_u1@guha.mx";
			let password = "123123";
			this.get('firebase').auth().createUserWithEmailAndPassword(email, password).then((user)=>{
				this.get('store').createRecord('administrator', {
					nombre: 'Alex',
					apellidoPaterno: 'M.',
					apellidomaterno: 'L.',
					email: email,
					uid: user.id,
				}).save();
			}),then(()=>{
				//toastr.success('Registro exitoso');
			}).catch((error)=>{
				console.log(error);
			})
		}
	}
});

