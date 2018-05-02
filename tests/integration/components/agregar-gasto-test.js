import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('agregar-gasto', 'Integration | Component | agregar gasto', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{agregar-gasto}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#agregar-gasto}}
      template block text
    {{/agregar-gasto}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
