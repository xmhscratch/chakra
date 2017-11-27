import Column from '../column'

const RAW = (props = {}) => {
    return new Column('raw', {
        value: (value) => value,
        validate: (value) => _.get(props, 'validate', true),
        valueLength: (value) => -1,
        ...props
    })
}

export default RAW
