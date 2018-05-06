import Ember from 'ember';
import { inject as service } from "@ember/service";
import {computed} from '@ember/object';
import {isBlank} from '@ember/utils';
import { all } from 'rsvp';
import moment from 'moment';

export default Ember.Component.extend({
  session: service(),
	firebase: service('firebaseApp'),

	newEncuesta: computed('store', function(){
		return this.get('store').createRecord('poll')
	}),

  deadlineEncuesta: computed('fechaCierre', function(){
    if (!isBlank(this.get('fechaCierre'))){
      let dead = moment(this.get('fechaCierre')).endOf('day').utc();
      return dead
    } else {
      return null
    }
  }),

  settlerList: computed('store', 'currentUnit', function(){
		return DS.PromiseObject.create({
			promise: this.get('currentUnit').then((currentUnit)=>{
				return currentUnit.get('colonos').then((colonosList)=>{
					return colonosList;
				})
			})
		})
	}),

  actions: {
    addPregunta(encuesta){
      encuesta.get('preguntas').createRecord()
    },

    addEncuesta(encuesta){
      all(
          encuesta.get('preguntas').map((pregunta) => {
            all(
      				pregunta.get('respuestas').map((respuesta) => {
      					respuesta.save();
      				})
      			).then(()=>{
              pregunta.save();
            })
          })
      ).then(()=>{
        encuesta.set('administrador', this.get('admin'));
		 		encuesta.set('unidadHab', this.get('currentUnit'));
		 		encuesta.set('fechaCierre', this.get('deadlineEncuesta'));
        this.get('settlerList').then((colonosList)=>{
          colonosList.forEach((colono)=>{
            encuesta.get('instancias').then((instanciasList)=>{
              // encuesta.get('preguntas').then((questionList)=>{
              //   let qList = [];
              //   questionList.forEach((theQuestion)=>{
              //     qList.pushObject(theQuestion)
              //   })
                this.get('store').createRecord('survey', {
                  encuestaBase: encuesta,
                  fechaCierre: this.get('deadlineEncuesta'),
                  colono: colono,
                  // preguntas: qList
                }).save().then((record)=>{
                  instanciasList.pushObject(record)
                  colono.get('encuestas').then((ssurveyList)=>{
                    ssurveyList.pushObject(record)
                    ssurveyList.save().then(()=>{
                      colono.save()
                    })
                  })
                })
              // })
              instanciasList.save();
            })
          })
          colonosList.save().then(()=>{
            encuesta.save().then(()=>{
              this.get('currentUnit.encuestas').then((encuestasList)=>{
                encuestasList.pushObject(encuesta)
                encuestasList.save().then(()=>{
                  this.get('currentUnit').then((unit)=>{
                    unit.save().then(()=>{
                      this.sendAction('addEncuesta')
                    })
                  })
                })
              })
            })
          })
        })
      })
		},

    cancel(){
			this.sendAction('addEncuesta')
		}
  }

});
