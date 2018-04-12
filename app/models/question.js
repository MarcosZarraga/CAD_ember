import DS from 'ember-data';

export default DS.Model.extend({
    contenido: DS.attr('string'),
    respuestas: DS.hasMany('answer')
});
