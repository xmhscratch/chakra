import Column from '../column'

const OBJECT = (props = {}) => {
    return new Column('object', {
        value: (value) => {
            if (value && _.isString(value)) {
                value = appl.helper.string.parseJSON(value)
            }
            return _.get(props, 'validate', _.toPlainObject(value))
        },
        validate: (value) => _.get(props, 'validate', true),
        valueLength: (value) => value ? _.size(value) : 0,
        ...props
    })
}

export default OBJECT
