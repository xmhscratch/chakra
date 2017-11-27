// appl.profile.get('default').set({
//     headers: {
//         'X-User-ID': 'keaohgc1g1dc3jh6k801gkiyswl9d5nm'
//     },
// })

export default (done) => {
    require('./object/app')
    require('./object/user')
    require('./object/message')

    appl.ui.set('is_loaded', true)
    return done()
}
