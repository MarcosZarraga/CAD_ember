import DS from 'ember-data';
import User from './user';

export default User.extend({
    unidadHab: DS.hasMany('housing-unit'),

});
