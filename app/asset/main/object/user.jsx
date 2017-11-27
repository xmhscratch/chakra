const {
    User,
    Message,
} = Resources.Main

// appl.store('main', 'block/:blockId/get', (params, callback) => {
//     const { blockId } = params
//     if (!blockId || blockId.length != 24) {
//         return callback(true)
//     }
//     return async.parallel({
//         blockNode: (cb) => appl.restore('main', `block/${blockId}/get/node`, cb),
//         blockAttribute: (cb) => appl.restore('main', `block/${blockId}/get/attribute`, cb),
//         blockProperty: (cb) => appl.restore('main', `block/${blockId}/get/property`, cb),
//     }, callback)
// })
