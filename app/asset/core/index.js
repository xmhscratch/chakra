import * as Backbone from './backbone'

export const Events = Backbone.Events

export const Model = Backbone.Model.extend({
    idAttribute: 'key'
})

export const Collection = Backbone.Collection.extend({
    modelId: (attributes) => attributes.key
})
