import Column from '../column'

const ARRAY = (props = {}) => {
    return new Column('array', {
        value: (value) => {
            if (value && _.isString(value)) {
                value = appl.helper.string.parseJSON(value)
            }
            return _.get(props, 'validate', _.toArray(value))
        },
        validate: (value) => _.get(props, 'validate', true),
        valueLength: (value) => value ? _.size(value) : 0,
        ...props
    })
}

export default ARRAY
