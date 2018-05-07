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
            return all(
      				pregunta.get('respuestas').map((respuesta) => {
      					return respuesta.save();
      				})
      			).then(()=>{
              return pregunta.save();
            })
          })
      ).then(()=>{
        encuesta.set('administrador', this.get('admin'));
		 		encuesta.set('unidadHab', this.get('currentUnit'));
		 		encuesta.set('fechaCierre', this.get('deadlineEncuesta'));
        return this.get('settlerList').then((colonosList)=>{
          return all(
            colonosList.map((colono)=>{
              return encuesta.get('instancias').then((instanciasList)=>{
                return this.get('store').createRecord('survey', {
                  encuestaBase: encuesta,
                  colono: colono,
                }).save().then((record)=>{
                  instanciasList.pushObject(record)
                  return colono.get('encuestas').then((ssurveyList)=>{
                    ssurveyList.pushObject(record);
                    return ssurveyList.save().then(()=>{
                      return colono.save();
                    })
                  })
                }).then(()=>{
                  return instanciasList.save();
                })

              })
            })
          ).then(()=>{
            return colonosList.save().then(()=>{
              return encuesta.save().then(()=>{
                return this.get('currentUnit.encuestas').then((encuestasList)=>{
                  encuestasList.pushObject(encuesta);
                  return encuestasList.save().then(()=>{
                    return this.get('currentUnit').then((unit)=>{
                      debugger
                      return unit.save().then(()=>{

                        return this.sendAction('addEncuesta');
                      }).catch((error)=>{
                        debugger
                      })
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
