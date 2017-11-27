import { Model, Collection } from '../../'

export default class Navigation extends Model {

    static NAV_TOP_BAR = 1
    static NAV_SIDE_BAR = 2

    module = null

    constructor(attributes, options) {
        super(_.defaultsDeep(attributes, {
            key: null,
            title: 'Example',
            description: '',
            icon: 'sticky note outline',
            legacy_icon: true,
            position: Navigation.NAV_SIDE_BAR,
            href: '',
            // if set toggle subnav else go main path router
            children: false,
            demonstrate: false,
        }), options)
    }

    getUrl() {
        return String(this.get('href'))
    }
}
