import DS from 'ember-data';

export default DS.Model.extend({
    uid: DS.attr('string'),
    nombre: DS.attr('string'),
    apellidoPaterno: DS.attr('string'),
    apellidoMaterno: DS.attr('string'),
    telefono: DS.attr('string'),
    email: DS.attr('string'),
    direccion: DS.attr('string'),
});
