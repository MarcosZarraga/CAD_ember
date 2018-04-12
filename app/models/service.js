import DS from 'ember-data';

export default DS.Model.extend({
    nombre: DS.attr('string'),
    referencia: DS.attr('string'),
    telefono: DS.attr('string'),
    costo: DS.attr('number'),

    unidadHab: DS.belongsTo('housing-unit')
});
