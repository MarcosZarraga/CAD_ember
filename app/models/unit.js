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
    gastos: DS.hasMany('spending'),

    alertas: DS.hasMany('alert'),
    solicitudes: DS.hasMany('request'),

    encuestas: DS.hasMany('poll'),
});

