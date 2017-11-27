import { Router } from 'react-router'

import Layout from './layout'

export default class Renderer {

    static RootId = 'container'
    static getRootElement() {
        return document.getElementById(Renderer.RootId)
    }

    element = null
    Layout = Layout

    constructor() {
        var rootElement = Renderer.getRootElement()
        appl.ui.trigger('render:before')
        this.element = ReactDOM.render(this.getRouter(), rootElement)
        appl.ui.trigger('render:after')

        jQuery(document)
            .off('click', 'a:not([data-pjax])')
            .on('click', 'a:not([data-pjax])', function(e) {
                e.preventDefault()
                return appl.redirect(e.currentTarget.getAttribute('href'))
            })
        return this
    }

    getRouter() {
        return <Router history={appl.history} routes={{
            path: '/',
            component: Layout,
            onEnter: (nextState, replace) => {
                return appl.ui.trigger('router:enter', nextState, replace)
            },
            onChange: (prevState, nextState, replace) => {
                return appl.ui.trigger('router:change', prevState, nextState, replace)
            },
            onLeave: (prevState) => {
                return appl.ui.trigger('router:leave', prevState)
            },
            childRoutes: appl.module.getChildRoutes()
        }}></Router>
    }
}
