import { Model, Collection } from '../'
import DependencyResolver from 'dependency-resolver'
import Module from './model'

export default class ModuleManager extends Collection {

    model = Module
    resolver = new DependencyResolver()

    constructor(models, options) {
        super(models, options)

        this.on('add remove', (module) => {
            var keyName = module.get('key')
            var dependencyModules = module.get('dependency')

            this.resolver.add(keyName)
            _.forEach(dependencyModules, (dependencyName) => {
                this.resolver.setDependency(keyName, 'main')
                this.resolver.setDependency(keyName, dependencyName)
            })
        })
    }

    loadFromUrl(scriptUrl, callback) {
        if (!scriptUrl) {
            return callback()
        }
        var d = document
        var s = 'script'
        var id = appl.helper.string.random(8)
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
            return callback()
        }
        js = d.createElement(s)
        js.id = id
        js.src = scriptUrl
        js.onload = (e) => callback(null, e)
        js.onerror = (error) => callback(error)
        return fjs.parentNode.insertBefore(js, fjs)
    }

    getChildRoutes() {
        return this.map((module) => module.get('router'))
    }

    getIndexes() {
        var indexes = this.resolver.sort()

        this.each((module) => {
            module.set('_index', _.indexOf(
                indexes, module.get('key')
            ), { silent: true })
        })

        return this.sortBy('_index')
    }
}
