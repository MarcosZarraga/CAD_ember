import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('agregar-pago', 'Integration | Component | agregar pago', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{agregar-pago}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#agregar-pago}}
      template block text
    {{/agregar-pago}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
