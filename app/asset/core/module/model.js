import { Model, Collection } from '../'

export default class Module extends Model {

    static defaults = {
        _index: 0,
        key: null,
        config: {},
        payload: {},
        baseUrl: null,
        dependency: [],
        resource: [],
        router: {},
        navigation: [],
        tenantId: null,
        profile: null
    }

    setup = null
    manifest = null

    constructor(attributes, options) {
        super(_.defaultsDeep(attributes, Module.defaults), options)
        if (!window.Resources) window.Resources = {}
    }

    install(callback = _.noop) {
        const { Navigation, Modal } = Application.UI

        // setup resource
        var resources = this.get('resource')
        _.forEach(resources, (manifest, index) => {
            let keyName = manifest.key

            manifest.baseUrl = this.get('baseUrl')
            let resource = new Application.Resource(
                {...manifest}, { module: this }
            )

            let resourceObjectPath = appl.helper.string.className(keyName)
            _.set(window.Resources, resourceObjectPath, resource)

            return appl.resource.add(resource)
        })

        // setup navigation
        var navigations = this.get('navigation')
        _.forEach(navigations, (manifest) => {
            manifest.demonstrate = false

            var navigation = new Navigation(manifest)
            navigation = appl.ui.navigation.add(navigation, { merge: true })
            navigation.module = this
        })

        // setup modal
        var modals = this.get('modal') || []
        _.forEach(modals, (component, keyName) => {
            if (!component) return
            var modal = new Modal({
                key: keyName,
                component: component
            })

            return appl.ui.modal.add(modal, { merge: true })
        })

        return _.isFunction(this.setup) ? this.setup(callback) : callback()
    }

    switchTenant(tenantId) {
        let moduleKey = this.get('key')

        let profile = appl.profile.get(moduleKey)
        if (!profile) {
            profile = new Application.Profile({
                key: this.get('key'),
                headers: {
                    'X-Tenant-ID': tenantId
                }
            })
            appl.profile.add(profile)
        } else {
            profile.set('headers', {
                'X-Tenant-ID': tenantId
            })
        }

        this.set({ profile, tenantId })
        return this
    }
}
