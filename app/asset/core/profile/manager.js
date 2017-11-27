import { Model, Collection } from '../'
import Profile from './model'

export default class ProfileManager extends Collection {

    model = Profile

    constructor(...args) {
        super(...args)

        this.add([{
            key: 'default',
        }], { model: Profile })
    }

    getDefault() {
    	return this.get('default')
    }
}
