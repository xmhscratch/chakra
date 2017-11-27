import { Model, Collection } from '../../'
import Modal from './model'
import Renderer from './renderer'

export default class ModalManager extends Collection {
    model = Modal

    constructor(models, options) {
        super(models, options)
    }

    render() {
        return new Renderer(this.models, () => {})
    }

    toggle(keyName, nextProps = {}) {
        var model = this.get(keyName)
        if (!model) {
            return false
        }

        this.chain().reject(
            (e) => _.isEqual(e.get('key'), model.get('key'))
        ).invoke('set', 'visible', false, {
            silent: true
        })

        var visibility = model.get('visible')
        model.set({
            visible: !visibility,
            props: nextProps
        })
        return model
    }
}
