import Ember from 'ember';

export default Ember.Component.extend({
	actions : {
		addServicio(servicio){
			servicio.save().then(()=>{
				this.sendAction('addServicio')
			})
		}
	}
});
