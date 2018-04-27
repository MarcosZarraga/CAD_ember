import DS from 'ember-data';

export default DS.Model.extend({
    nombre: DS.attr('string'),
    referencia: DS.attr('string'),
    fecha: DS.attr('string'),
    monto: DS.attr('number'),

    unidadHab: DS.belongsTo('unit'),
    administrador: DS.belongsTo('administrator')
});
