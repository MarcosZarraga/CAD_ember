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

    currentPagos: computed('pagos.@each.fechaUnix', function(){
      let cPagos = 0;
      let currentDate = moment();
      let monthStart = moment().startOf('month').format('YYYY-MM-DD hh:mm');
      let monthEnd = moment().endOf('month').format('YYYY-MM-DD hh:mm');
      let startUnix = moment.utc(monthStart).unix();
      let endUnix = moment.utc(monthEnd).unix();
      this.get('pagos').forEach((pago)=>{
        let date = pago.get('fechaUnix');
        if (date > startUnix && date < endUnix){
          cPagos += pago.get('monto');
        }
      })
    return (!isNaN(cPagos))? cPagos: 0;
  }),

  status: computed('currentPagos', 'unidadHab.pagoMensual', function(){
    return DS.PromiseObject.create({
      promise: this.get('unidadHab').then((unit)=>{
        let status = "";
        if(this.get('currentPagos') >= unit.get('pagoMensual')) {
          status = "Al corriente"
          return status;
        } else {
          status = "Atrasado"
          return status;
        }
      })
    })
  })
});
