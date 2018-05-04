import DS from 'ember-data';
import User from './user';

export default User.extend({
    unidadHab: DS.belongsTo('unit'),

    pagos: DS.hasMany('payment'),
    solicitudes: DS.hasMany('request'),
    alertas: DS.hasMany('alert'),
    encuestas: DS.hasMany('survey'),

    status: DS.attr('string')
});
