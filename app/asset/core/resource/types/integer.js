import Column from '../column'

const INTEGER = (props = {}) => {
    return new Column('integer', {
        value: (value) => _.toInteger(value),
        validate: (value) => _.get(props, 'validate', /(?=<=\s|^)\d+(?=\s|$)/g.test(value)),
        valueLength: (value) => _.toInteger(value),
        ...props
    })
}

export default INTEGER
