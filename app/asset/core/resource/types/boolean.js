import Column from '../column'

const BOOLEAN = (props = {}) => {
    return new Column('boolean', {
        value: (value) => /(true|1)/g.test(String(value).toLowerCase()) ? true : false,
        validate: (value) => _.get(props, 'validate', /^(true|1|false|0)$/g.test(String(value).toLowerCase())),
        valueLength: (value) => -1,
        ...props
    })
}

export default BOOLEAN
