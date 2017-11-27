const ResourceTypes = Application.Resource.Types
const ResourceSchema = Application.Resource.Schema

export default class Message extends ResourceSchema {
    columns = {
        id: ResourceTypes.STRING(24),
        title: ResourceTypes.STRING(255),
        createdAt: ResourceTypes.DATETIME(),
        updatedAt: ResourceTypes.DATETIME(),
    }
}
