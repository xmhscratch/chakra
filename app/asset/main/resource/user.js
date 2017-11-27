const ResourceTypes = Application.Resource.Types
const ResourceSchema = Application.Resource.Schema

export default class User extends ResourceSchema {
    columns = {
        id: ResourceTypes.UUIDv4(),

        name: ResourceTypes.STRING({
            allowNull: false,
            minLength: 4,
            maxLength: 255
        }),

        email_address: ResourceTypes.EMAIL({
            allowNull: false,
            maxLength: 60
        }),

        password: ResourceTypes.STRING({
            allowNull: false,
            minLength: 5,
            maxLength: 255
        }),

        created_time: ResourceTypes.DATETIME({
            allowNull: true,
            defaultValue: Date.now()
        }),
    }
}
