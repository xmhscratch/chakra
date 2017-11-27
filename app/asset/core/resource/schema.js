import Backbone from '../backbone'
import { Model, Collection } from '../'
import Column from './column'

export default class Schema extends Model {
    columns = []
    errors = {
        DEFAULT: 'Invalid',
        INVALID_MIN_LENGTH: 'Min length',
        INVALID_MAX_LENGTH: 'Max length',
        INVALID_COLUMN_NAME: 'Column does not exist'
    }
    lastModified = 0

    constructor(attributes, options) {
        super(attributes, options)

        const scope = this

        let profile = this.getProfile()
        this.api = profile.request.bind(profile)

        let localParse = this.parse.bind(this)
        this.parse = function(response, options) {
            let attributes = localParse(
                response.results, options
            )
            if (attributes._id) {
                attributes.id = attributes._id
                delete attributes._id
            }
            return this._parse(attributes)
        }

        this.validate = function(attributes, options) {
            if (this.isNew()) {
                return null
            }

            let noError = _.overSome([_.isNull, _.isUndefined])
            let errorCodes = _.chain(attributes)
                .mapValues(function(attrValue, attrName) {
                    let column = scope.columns[attrName]
                    if (!column) {
                        return scope.errors['INVALID_COLUMN_NAME']
                    }
                    let errorCode = column.validateRowValue(attrValue)
                    return scope.errors[errorCode]
                })
                .omitBy(noError)
                .value()
            let hasErrors = _.keys(errorCodes).length > 0
            return hasErrors ? errorCodes : null
        }

        // this.initialize.apply(this, arguments)
        return this
    }

    initialize() {
        return super.initialize()
    }

    set(key, val, options) {
        let results = Model.prototype.set.apply(this, arguments)

        if (options && options.silent) {
            return results
        }

        if (_.lte(this.lastModified, 0)) {
            return results
        }

        if (_.gte(Date.now() - this.lastModified, 150)) {
            this._changing = true
        }

        if (this._pending && this._changing) {
            this.trigger('change', this, options)
        }

        return results
    }

    submit(url, done) {
        if (!this.sync('create', this, {
            url: url,
            method: 'POST',
            wait: true,
            success: (model, response) => {
                return done(null, response)
            },
            error: () => {
                return done(new Error('Cannot submit the item.'))
            }
        })) {
            console.error(this.validationError)
            return done(this.validationError)
        }
    }

    // override backbone default save
    save(url, done) {
        let changes

        if (this.isNew()) {
            changes = this.toJSON()
        } else {
            changes = this.changedAttributes()
        }

        if (!changes || _.isEmpty(changes)) {
            return done(null, this.toJSON())
        }

        if (!Model.prototype.save.call(this, changes, {
            url: url,
            method: 'POST',
            wait: true,
            success: (model, response) => {
                this._changing = false
                this.lastModified = Date.now()

                return done(null, response)
            },
            error: () => {
                return done(new Error('Cannot save the item.'))
            }
        })) {
            console.error(this.validationError)
            return done(this.validationError)
        }
    }

    // override backbone default destroy
    destroy(url, done) {
        if (!Model.prototype.destroy.call(this, {
            url: url,
            method: 'POST',
            wait: true,
            success: (model, response) => {
                return done(null, response)
            },
            error: () => {
                return done(new Error('Cannot delete the item.'))
            }
        })) {
            console.error(this.validationError)
            return done(this.validationError)
        }
    }

    getApiUrl(...paths) {
        return _.concat([this.baseUrl], paths).join('/')
    }

    // override backbone isNew function
    isNew() {
        return _.isEmpty(this.get(this.idAttribute))
    }

    _reset(attributes) {
        this.lastModified = Date.now()
        this.set(
            this._parse(attributes),
            { silent: true }
        )
        return this
    }

    _parse(attributes) {
        return _.mapValues(this.columns, function(column, colName) {
            let attrValue = column.defaultValue
            if (attributes) {
                attrValue = attributes[colName]
            }
            return column.parseRowValue(attrValue)
        })
    }
}
