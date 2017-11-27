import Column from '../column'

const UUIDv4 = (props = {}) => {
    return new Column('uuidv4', {
        value: (value) => _.get(props, 'validate', _.toString(value)),
        validate: (value) => _.get(props, 'validate', /^[0-9A-F]{8}\-[0-9A-F]{4}\-4[0-9A-F]{3}\-[89AB][0-9A-F]{3}\-[0-9A-F]{12}$/gi.test(value)),
        valueLength: (value) => value ? value.length : 36,
        ...props
    })
}

export default UUIDv4
