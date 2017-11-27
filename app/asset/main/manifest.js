import MainLayout from './layout'
import IndexPage from './page/index'

import HelloModal from './modal/hello'

import AppState from './resource/app-state'
import User from './resource/user'
import Message from './resource/message'

export default (payload) => {
    return {
        dependency: [],
        baseUrl: payload.urls.api,
        resource: [{
            key: 'main/app_state',
            schema: AppState,
        }, {
            key: 'main/user',
            profile: 'default',
            schema: User,
        }, {
            key: 'main/message',
            profile: 'default',
            schema: Message,
        }],
        router: {
            path: '',
            component: MainLayout,
            indexRoute: { component: IndexPage },
        },
        // navigation: [],
        modal: {
            'main/hello': HelloModal,
        }
    }
}
