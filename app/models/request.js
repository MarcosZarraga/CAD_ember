import DS from 'ember-data';

export default DS.Model.extend({
    titulo: DS.attr('string'),
    espacio: DS.attr('string'),
    tiempo: DS.attr('string'),
    descripcion: DS.attr('string'),
    fecha: DS.attr('string'),
    aprobado: DS.attr('boolean'),

    unidadHab: DS.belongsTo('unit'),
    colono: DS.belongsTo('settler')
});
