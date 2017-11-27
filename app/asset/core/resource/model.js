import { Model, Collection } from '../'
import Schema from './schema'
import Types from './types'

export default class Resource extends Model {
    static Schema = Schema
    static Types = Types

    static defaults = {
        key: null,
        schema: null,
        baseUrl: null
    }

    Model = null
    Collection = null

    _module = null

    constructor(attributes, options) {
        attributes = _.defaultsDeep(attributes, Resource.defaults)
        super(attributes, options)

        const Schema = this.get('schema')
        const { module } = options

        this.Model = Schema.extend({
            baseUrl: this.get('baseUrl'),
            idAttribute: Schema.idAttribute || 'id',
            href: function(url) {
                // check if passed url param is absolute
                if (/^(?:[a-z]+:)?\/\//gi.test(url)) {
                    this.url = url
                } else {
                    var baseUrl = this.baseUrl || this.url || '/'
                    this.url = appl.helper.url.resolve(baseUrl, _.toString(url))
                }

                return this
            },
            getProfile: (name) => this.getProfile(name)
        })

        this.Collection = Collection.extend({
            url: '/',
            baseUrl: this.get('baseUrl'),
            model: this.Model,
            modelId: (attrs) => {
                var modelId = this.get('modelId') ? this.get('modelId') : 'id'
                return attrs[modelId]
            },
            _delta: {
                index: 0, total: 1, limit: 20, offset: 0
            },
            href: function(url) {
                var baseUrl = this.baseUrl || this.url || '/'
                this.url = appl.helper.url.resolve(baseUrl, _.toString(url))

                return this
            },
            parse: function(resp) {
                return resp.results
            },
            getDelta: function(keyPath) {
                return _.get(this._delta, keyPath)
            },
            getProfile: (name) => this.getProfile(name)
        })

        this._module = module
        return this
    }

    getProfile(name) {
        let profile = appl.profile.get(name)

        if (!profile) {
            profile = this._module.get('profile')
        }

        if (!profile) {
            profile = appl.profile.getDefault()
        }

        return profile
    }

    // create new model from resource
    model(...args) {
        const model = new this.Model(...args)

        model.on('sync', (model, response, options) => {
            model._reset(
                model.parse(response, options)
            )
            if (!model.isValid()) {
                console.error(model.validationError)
            }
        })
        model._reset(args[0])

        return model
    }

    // create new collection from resource
    collection(...args) {
        var collection = new this.Collection(...args)

        collection.on('sync', function(collection, response, options) {
            collection._delta = _.extend(
                {}, collection._delta, response.delta 
            )

            collection.map(function(model) {
                const results = model.toJSON()
                return model._reset(
                    model.parse({ results }, options)
                )
            })
        })

        return collection
    }
}
