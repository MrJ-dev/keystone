const { GrapesJSEditor, MongoRelationshipInterface, KnexRelationshipInterface } = require('./Implementation');

// We're going to extend the integer field to store
// a number between 1-5 and represent this as a rating
const { Relationship } = require('@keystonejs/fields');

module.exports = {
  type: 'GrapesJSEditor',
  implementation: GrapesJSEditor,
  views: {
    Controller: Relationship.views.Controller,
    Field: require.resolve('./views/Field'),
    Cell: require.resolve('./views/Cell'),
  },
  adapters: {
    mongoose: MongoRelationshipInterface,
    knex: KnexRelationshipInterface,
  },
};