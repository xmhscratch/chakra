const {
    User,
    AppState,
} = Resources.Main

appl.store('main', 'app_state', (params, callback) => {
    return callback(null, AppState.model({}))
})
