import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ver-encuesta', 'Integration | Component | ver encuesta', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ver-encuesta}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ver-encuesta}}
      template block text
    {{/ver-encuesta}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
