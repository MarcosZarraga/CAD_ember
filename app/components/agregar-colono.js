import Ember from 'ember';

export default Ember.Component.extend({
	actions : {
		addColono(colono){
			colono.save().then(()=>{
				this.sendAction('addColono')
			})
		}
	}
});
