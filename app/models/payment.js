import DS from 'ember-data';

export default DS.Model.extend({
    fecha: DS.attr('string'),
    concepto: DS.attr('string'),
    monto: DS.attr('number'),

    unidadHab: DS.belongsTo('housing-unit'),
    colono: DS.belongsTo('settler')
});
