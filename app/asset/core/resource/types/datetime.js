import Column from '../column'

const DATETIME = (props = {}) => {
    return new Column('datetime', {
        value: (value) => moment(value, moment.ISO_8601, true),
        validate: (value) => _.get(props, 'validate', moment(value, moment.ISO_8601, true).isValid()),
        valueLength: (value) => -1,
        ...props
    })
}

export default DATETIME
