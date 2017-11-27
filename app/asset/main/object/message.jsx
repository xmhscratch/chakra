const {
    User,
    Message,
} = Resources.Main

// appl.store('main', 'form/:formId/get/screens', (params, callback) => {
//     const { formId } = params

//     return Screen.collection({})
//         .href(`/form/${formId}/get/screens`)
//         .fetch({
//             success: (model) => callback(null, model),
//             error: (error) => callback(error)
//         })
// })

// appl.store('main', 'current_form_screens', (params, callback) => {
//     return appl.restore('main', 'app_state', (error, appState) => {
//         const formId = appState.get('currentFormId')
//         return appl.restore('main', `form/${formId}/get/screens`, callback)
//     })
// })
