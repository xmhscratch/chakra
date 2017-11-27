import { Model } from './'

import Renderer from './renderer'

import NavigationManager from './ui/navigation/manager'
import Navigation from './ui/navigation/model'

import ModalManager from './ui/modal/manager'
import Modal from './ui/modal/model'

export default class UI extends Model {

    static Modal = Modal
    static Navigation = Navigation

    navigation = new NavigationManager()
    modal = new ModalManager()
    renderer = null

    event = _.extend({}, Application.Events)

    constructor(attributes, options) {
        super(_.defaultsDeep(attributes, {
            content_height_minimum: 0,
            is_loaded: false,
            is_content_loaded: true,
        }), options)
    }

    render() {
        this.renderer = new Renderer()

        const _refresh = _.debounce(() => {
            this.refresh()
        }, 100)

        jQuery(window).bind('resize', _refresh)
        this.event.listenTo(
            appl, 'router:change', _refresh
        )
        this.on('change', _refresh)

        _refresh()
    }

    refresh(silent = false) {
        setImmediate(() => {
            this.set({
                content_height_minimum: this.getContentMinimumHeight()
            }, { silent: true })

            if (!silent) {
                this.trigger('ui:refresh')
            }
        })

        return true
    }

    getContentPadding() {
        return 14 * 2
    }

    getContentWidth() {
        return jQuery(window).width() -
            this.getContentPadding()
    }

    getContentMinimumHeight() {
        var height = jQuery(window).height()
        // height -= jQuery('#app_header').outerHeight()
        // height -= jQuery('#app_footer').outerHeight()
        height -= 1
        return height
    }

    showLoading(e) {
        return this.set('is_content_loaded', false)
    }

    hideLoading(e) {
        return this.set('is_content_loaded', true)
    }
}
