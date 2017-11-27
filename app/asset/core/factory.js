import pathToRegexp from 'path-to-regexp'

export const MAXIMUM_CALLBACK_THRESHOLD = 1000

export default class Factory {

    pattern = null
    keys = []
    generator = _.noop
    keyStack = []
    callStack = {}

    constructor(pattern, generator) {
        this.pattern = pathToRegexp(pattern, this.keys)
        this.generator = generator
    }

    isMatch(keyPath) {
        return this.pattern.test(keyPath)
    }

    fetch(keyPath, callback) {
        var $scope = this

        if (this.keyStack[keyPath]) return
        this.keyStack.push(keyPath)

        var paramValues = this.pattern.exec(keyPath)
        var paramKeys = _.chain(this.keys).keyBy('name').keys().value()
        var params = _.zipObject(paramKeys, _.tail(paramValues))

        this.generator(params, function(error, obj) {
            if (error) return

            let _t = setTimeout(function() {
                callback.apply($scope.generator, [error, obj, $scope])

                var index = $scope.keyStack.indexOf(keyPath)
                if (index > -1) $scope.keyStack.splice(index, 1)

                return clearTimeout(_t)
            }, 0)

            return
        })
    }

    push(keyPath, callback) {
        if (!_.isArray(this.callStack[keyPath])) {
            this.callStack[keyPath] = []
        }
        this.callStack[keyPath].push(callback)
    }

    execute(scope, keyPath, args) {
        let callbackTick = 0
        let callStack = this.callStack[keyPath]

        while (callStack.length > 0 && callbackTick < MAXIMUM_CALLBACK_THRESHOLD) {
            let callback = callStack.pop()
            if (_.isFunction(callback)) {
                callback.apply(scope, args)
            }
            callbackTick++
        }
    }
}
