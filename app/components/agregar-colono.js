import Ember from 'ember';
import { inject as service } from "@ember/service";

export default Ember.Component.extend({
	session: service(),
	firebase: service('firebaseApp'),

	actions : {
		addColono(colono){
			this.get('firebase').auth().createUserWithEmailAndPassword(colono.get('email'), this.get('password')).then((colonoAuth) => {
				console.log(colonoAuth.uid)
				colono.set('uid', colonoAuth.uid)
				debugger	
				colono.save().then(()=>{
					this.sendAction('addColono')
				})
			}).then(()=>{
				//toastr.success('Registro exitoso');
				console.log('Colono registrado')
			}).catch((error)=>{
				console.log(error);
			})

			
		}
	}
});
