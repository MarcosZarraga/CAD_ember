import DS from 'ember-data';
import User from './user';

export default User.extend({
    unidadHab: DS.belongsTo('unidad-hab'),

    pagos: DS.hasMany('payment'),
    solicitudes: DS.hasMany('request'),
    alertas: DS.hasMany('alert'),

    status: DS.attr('string')
});
