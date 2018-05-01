import Ember from 'ember';
import { inject as service } from "@ember/service";
import moment from 'moment';

export default Ember.Component.extend({
	session: service(),
	firebase: service('firebaseApp'),

	actions : {
		addColono(colono){
				colono.set('fechaRegistro', moment().format())
				colono.save().then(()=>{
          this.sendAction('addColono')
        })
		},

		cancel(){
			this.sendAction('addColono')
		}

	}

});
