import { Model, Collection } from '../'
import Resource from './model'

export default class ResourceManager extends Collection {

    model = Resource

    constructor(...args) {
        super(...args)
    }
}
