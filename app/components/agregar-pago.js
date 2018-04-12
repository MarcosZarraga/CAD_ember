import Ember from 'ember';

export default Ember.Component.extend({
	actions : {
		addPago(pago){
			pago.save().then(()=>{
				this.sendAction('addPago')
			})
		}
	}
});
