import { Model, Collection } from '../../'
import Navigation from './model'

export default class NavigationManager extends Collection {

    model = Navigation

    constructor(models, options) {
        super(models, options)

        this.add([{
            key: 'dynamic-site',
            title: 'Dynamic Site',
            description: 'Dynamic Site build on Web API',
            icon: 'fork',
            position: Navigation.NAV_TOP_BAR,
            children: false,
            demonstrate: true
        }, {
            key: 'file-storage',
            title: 'File Storage',
            description: 'Durable, scalable cloud storage service',
            icon: 'disk outline',
            position: Navigation.NAV_TOP_BAR,
            children: false,
            demonstrate: true
        },
        // {
        //     key: 'session-storage',
        //     title: 'Session Storage',
        //     description: 'Store all information about webclient',
        //     icon: 'database',
        //     position: Navigation.NAV_TOP_BAR,
        //     children: false,
        //     demonstrate: true
        // }, {
        //     key: 'event-observe',
        //     title: 'Event Observe',
        //     description: 'Get job done while something about to happen',
        //     icon: 'wait',
        //     position: Navigation.NAV_TOP_BAR,
        //     children: false,
        //     demonstrate: true
        // }
        ], { model: Navigation })

        // this.add([{
        //         key: 'subscriber',
        //         title: 'Subscriber',
        //         description: 'Manage Subscriber List',
        //         icon: 'user',
        //         position: Navigation.NAV_SIDE_BAR,
        //         children: false,
        //         demonstrate: true
        //     }, {
        //         key: 'article',
        //         title: 'Articles',
        //         description: 'Manage Article List',
        //         icon: 'newspaper',
        //         position: Navigation.NAV_SIDE_BAR,
        //         children: false,
        //         demonstrate: true
        //     }, {
        //         key: 'e-commerce',
        //         title: 'Electronic\nCommerce',
        //         description: 'Electronic Commerce Platform',
        //         icon: 'shopping bag',
        //         position: Navigation.NAV_SIDE_BAR,
        //         children: false,
        //         demonstrate: true
        //     }, {
        //         key: 'facebook-marketing',
        //         title: 'Facebook\nMarketing',
        //         description: 'Facebook Marketing Tools',
        //         icon: 'facebook',
        //         position: Navigation.NAV_SIDE_BAR,
        //         children: false,
        //         demonstrate: true
        //     }, {
        //         key: 'shorten-link',
        //         title: 'Shorten\nLink',
        //         description: 'Shorten Link Tools',
        //         icon: 'unlinkify',
        //         position: Navigation.NAV_SIDE_BAR,
        //         children: false,
        //         demonstrate: true
        //     }, {
        //         key: 'analytic-tool',
        //         title: 'Analytic\nTool',
        //         description: 'Web Analytic Tool',
        //         icon: 'line chart',
        //         position: Navigation.NAV_SIDE_BAR,
        //         children: false,
        //         demonstrate: true
        //     },
        //     // {
        //     //     key: 'calculator',
        //     //     title: 'Calculator',
        //     //     description: 'Calculator',
        //     //     icon: 'calculator',
        //     //     position: Navigation.NAV_SIDE_BAR,
        //     //     children: false,
        //     //     demonstrate: true
        //     // }, {
        //     //     key: 'todo-list',
        //     //     title: 'Todo List',
        //     //     description: 'Todo List App',
        //     //     icon: 'calendar',
        //     //     position: Navigation.NAV_SIDE_BAR,
        //     //     children: false,
        //     //     demonstrate: true
        //     // }
        // ], { model: Navigation })
    }
}
