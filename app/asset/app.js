import LRU from 'lru-cache'
import { browserHistory } from 'react-router'
import { Events, Model, Collection } from './core'

import ModuleManager from './core/module/manager'
import Module from './core/module/model'

import ProfileManager from './core/profile/manager'
import Profile from './core/profile/model'

import ResourceManager from './core/resource/manager'
import Resource from './core/resource/model'

import UI from './core/ui'
import Factory from './core/factory'
import helpers from './core/helper'

export default class Application extends Model {
    static Model = Model
    static Collection = Collection
    static Events = Events

    static Module = Module
    static Resource = Resource
    static Profile = Profile

    static UI = UI

    history = browserHistory
    helper = helpers
    module = new ModuleManager()

    factory = {}
    objects = LRU({
        max: 2500,
        dispose: (key, n) => {},
        maxAge: 1000 * 60 * 60 // 1 hour
    })

    resource = new ResourceManager()
    profile = new ProfileManager()

    ui = new UI()

    constructor(attributes, options) {
        super(_.defaultsDeep(attributes, {
            initialized: false,
            complete: false,
            use_app: false
        }), options)

        jQuery(document).ready(() => {
            this.set('initialized', true)
            this.trigger('initialized', true)
        })
    }

    attach(codeName, manifest, setup) {
        let module = new Module({ key: codeName })
        if (!module.isValid()) return

        module.setup = setup
        module.manifest = manifest

        this.module.add(module)
        return module
    }

    setup(serverKey, packages = []) {
        if (!serverKey) return false

        this.on('change:use_app', () => {
            if (!this.get('complete')) return true
            if (this.get('use_app')) this.ui.render()
        })

        return async.map(packages, (config, callback) => {
            return async.series([
                async.apply(this.module.loadFromUrl, config.devServer),
                async.apply(this.module.loadFromUrl, config.mainApp),
            ], callback)
        }, (error, results) => {
            return !_.isEmpty(results) ? async.mapSeries(
                this.module.getIndexes(),
                (module, callback) => {
                    const moduleKey = module.get('key')
                    const config = _.find(packages, ['key', moduleKey])

                    if (!config) {
                        return callback(new Error(`Cannot find the app with code name: ${moduleKey}`), null)
                    }

                    return jQuery.getJSON(config.payload, (payload) => {
                        let manifest = module.manifest(payload)

                        module.set({ ...manifest, payload, config })
                        return module.install(callback)
                    })
                },
                (error, results) => {
                    this.set('complete', true)
                    this.trigger('setup:complete')

                    this.ui.modal.render()
                    return this.get('use_app') ? this.ui.render() : false
                }
            ) : null
        })
    }

    store(keyName, keyPattern, generator) {
        if (!_.isFunction(generator)) {
            throw new Error('The generator must be a function')
        }

        this.factory[keyName] = this.factory[keyName] || []
        var factory = new Factory(keyPattern, generator)
        this.factory[keyName].push(factory)

        return true
    }

    restore(keyName, keyPath, callback) {
        let cacheKey = [keyName, keyPath].join('/')

        if (this.objects.has(cacheKey) && !!this.objects.peek(cacheKey)) {
            return callback(null, this.objects.get(cacheKey))
        }

        let entries = _.filter(
            this.factory[keyName],
            (factory) => factory.isMatch(keyPath)
        )
        switch (_.size(entries)) {
            case 0:
                return console.warn(`Cannot restore none stored item: ${keyPath}.`)
            case 1:
                {
                    let factory = _.head(entries)
                    factory.push(keyPath, callback)

                    let storedValue = this.objects.peek(cacheKey)
                    if (_.isNull(storedValue)) return

                    appl.objects.set(cacheKey, null)

                    NProgress.start()

                    factory.fetch(keyPath, function(error, obj, factory) {
                        NProgress.done()
                        appl.objects.set(cacheKey, obj)

                        return factory.execute(this, keyPath, [error, obj])
                    })

                    break
                }
            default:
                throw new Error(`Cannot restore a duplicated store key pattern.`)
        }
    }

    erase(keyName, keyPath) {
        let cacheKey = [keyName, keyPath].join('/')
        if (keyPath) {
            this.objects.del(cacheKey)
        } else {
            this.objects.forEach((value, key, cache) => {
                if (!(new RegExp(`^${keyName}`, 'g')).test(key)) return
                else this.objects.del(key)
            }, this)
        }
        return true
    }

    redirect(url) {
        if (!url) return
        var currentLocation = this.history.getCurrentLocation()
        var redirectURL = helpers.url.resolve(currentLocation.pathname, url)
        try {
            this.history.push(redirectURL)
        } catch (e) {
            console.warn(e)
        }
    }

    ///////////////////////
    // promise functions //
    ///////////////////////

    $restore(keyName, keyPath) {
        let self = this

        return new Promise ((resolve, reject) => {
            return self.restore(keyName, keyPath, (error, result) => {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(result)
                }
            })
        })
    }
}
