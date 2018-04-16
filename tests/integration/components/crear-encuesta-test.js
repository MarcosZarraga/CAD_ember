import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crear-encuesta', 'Integration | Component | crear encuesta', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{crear-encuesta}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#crear-encuesta}}
      template block text
    {{/crear-encuesta}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
