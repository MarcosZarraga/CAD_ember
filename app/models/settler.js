import DS from 'ember-data';
import User from './user';
import {computed} from '@ember/object';
import moment from 'moment';

export default User.extend({
    unidadHab: DS.belongsTo('unit'),

    pagos: DS.hasMany('payment'),
    solicitudes: DS.hasMany('request'),
    alertas: DS.hasMany('alert'),
    encuestas: DS.hasMany('survey'),

    status: DS.attr('string'),

    /*
    currentPagos: computed('pagos.@each.fecha', function(){
      let cPagos = [];
      let cMonth = moment().format('M');
      this.get('pagos').forEach((pago)=>{
        let fecha = pago.get('fecha');
        let formatFecha = moment(fecha);
        if(formatFecha.format('M') == cMonth){
          cPagos.pushObject(pago)
        }
      })
      console.log(cPagos)
      return cPagos;
    })
    */
});
