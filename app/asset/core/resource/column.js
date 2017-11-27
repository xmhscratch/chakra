export default class Column {

    allowNull = true
    minLength = 0
    maxLength = 0
    defaultValue = null

    value(value) {
        return value
    }

    valueLength(value) {
        return -1
    }

    validate(value) {
        return true
    }

    constructor(key, props) {
        this.key = key
        _.forOwn(props, (value, key) => _.set(this, key, value))
    }

    parseRowValue(value) {
        if (this.allowNull && _.isNull(value)) {
            return null
        } else {
            return this.value(value)
        }
    }

    validateRowValue(value) {
        if (this.allowNull && _.isNull(value)) {
            return null
        }

        let valueLength = this.valueLength(value)
        if (!_.eq(valueLength, -1)) {
            if (_.lt(valueLength, this.minLength)) {
                return 'INVALID_MIN_LENGTH'
            }
            if (
                _.gt(this.maxLength, 0) &&
                _.gt(valueLength, this.maxLength)
            ) {
                return 'INVALID_MAX_LENGTH'
            }
        }

        return !this.validate(value) ? 'DEFAULT' : null
    }
}
