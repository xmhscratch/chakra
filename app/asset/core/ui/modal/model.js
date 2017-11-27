import { Model, Collection } from '../../'

export default class Modal extends Model {

    static defaults = {
        key: null,
        component: null,
        element: null,
        closable: true,
        visible: false,
        props: {}
    }

    constructor(attributes, options) {
        super(_.defaultsDeep(attributes, Modal.defaults), options)
    }

    show = () => this.set('visible', true)
    hide = () => this.set('visible', false)
}
