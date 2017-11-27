import Column from '../column'

const STRING = (props = {}) => {
    return new Column('string', {
        value: (value) => _.get(props, 'validate', _.toString(value)),
        validate: (value) => _.get(props, 'validate', true),
        valueLength: (value) => value ? value.length : 0,
        ...props
    })
}

export default STRING
