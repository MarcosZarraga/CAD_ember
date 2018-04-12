import DS from 'ember-data';

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
    administradores: DS.hasMany('administrator'),

    servicios: DS.hasMany('service'),
    gastos: DS.hasMany('spending'),

    alertas: DS.hasMany('alert'),
    solicitudes: DS.hasMany('request'),

    encuestas: DS.hasMany('poll'),
});
