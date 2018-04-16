import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('agregar-colono', 'Integration | Component | agregar colono', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{agregar-colono}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#agregar-colono}}
      template block text
    {{/agregar-colono}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
