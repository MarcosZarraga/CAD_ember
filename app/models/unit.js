import DS from 'ember-data';
import {computed} from '@ember/object'

export default DS.Model.extend({
    nombre: DS.attr('string'),
    latitud: DS.attr('string'),
    longitud: DS.attr('string'),
    pais: DS.attr('string'),
    estado: DS.attr('string'),
    municipio: DS.attr('string'),
    colonia: DS.attr('string'),
    cp: DS.attr('string'),
    fechaDeContrato: DS.attr('string'),
    colonos: DS.hasMany('settler'),
    admin1: DS.attr('string'),
    admin2: DS.attr('string'),
    imageUrl:DS.attr('string'),
    admin1Obj: computed('admin1', function(){
      if(this.get('admin1')){
        return this.store.findRecord('administrator', this.get('admin1'))}
        else {
          return null
        }
    }),
    admin2Obj: computed('admin2', function(){
      if(this.get('admin2')){
        return this.store.findRecord('administrator', this.get('admin2'))}
        else {
          return null
        }
    }),
    servicios: DS.hasMany('service'),
    pagos: DS.hasMany('payment'),
    gastos: DS.hasMany('spending'),
    alertas: DS.hasMany('alert'),
    solicitudes: DS.hasMany('request'),

    encuestas: DS.hasMany('poll'),

    pagoMensual: DS.attr('number', {
      defaultValue: 1000
    }),

    totalPagos: computed('pagos.@each.monto', function() {
      let sumPagos = 0;
      this.get('pagos').forEach((pago) => {
        sumPagos += pago.get('monto');
      });
      return sumPagos;
    }).meta({ serialize: true }),

    totalGastos: computed('gastos.@each.monto', function() {
      let sumGastos = 0;
      this.get('gastos').forEach((gasto) => {
        sumGastos += gasto.get('monto');
      });
      return sumGastos;
    }).meta({ serialize: true }),

    /*
        pagosPendientes: computed('colonos.@each.currentPagos', 'pagoMensual', function(){
          let pagosPendientes = 0;
          this.get('colonos').forEach((colono)=>{
            let acum = 0;
            colono.get('currentPagos').forEach((pago)=>{
              acum += pago.get('monto')
            })
            if (acum < this.get('pagoMensual')) {
              pagosPendientes++;
            }
          })
          return pagosPendientes;
        }),
    */
    encuestasRespondidas: computed('encuestas.@each.respondidas', function() {
      let sumRespuestas = 0;
      this.get('encuestas').forEach((encuesta) => {
        sumRespuestas += encuesta.get('respondidas');
      });
      return sumRespuestas;
    }).meta({ serialize: true }),

});
