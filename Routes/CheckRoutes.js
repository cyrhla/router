/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const valid                       = require('@cyrhla/tester/valid')
const ObjectEmptyReferenceError   = require('@cyrhla/router/Error/ObjectEmptyReferenceError')
const RoutesKeyReferenceError     = require('@cyrhla/router/Error/RoutesKeyReferenceError')
const InitializeKeyReferenceError = require('@cyrhla/router/Error/InitializeKeyReferenceError')
const InitializeKeySyntaxError    = require('@cyrhla/router/Error/InitializeKeySyntaxError')
const ModuleNotFoundError         = require('@cyrhla/router/Error/ModuleNotFoundError')
const ActionKeyReferenceError     = require('@cyrhla/router/Error/ActionKeyReferenceError')
const RegexKeySyntaxError         = require('@cyrhla/router/Error/RegexKeySyntaxError')

/**
 * Checks syntax routes.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class CheckRoutes
{
    /**
     * Initializes this class with the given options.
     *
     * @param object rawRoutes
     */
    constructor(rawRoutes)
    {
        valid(rawRoutes, 'object')

        this._rawRoutes = rawRoutes

        this._check()
    }

    /**
     * Checks syntax routes.
     *
     * @throws ObjectEmptyReferenceError
     * @throws RoutesKeyReferenceError
     * @throws InitializeKeyReferenceError
     * @throws InitializeKeySyntaxError
     * @throws ModuleNotFoundError
     * @throws ActionKeyReferenceError
     * @throws RegexKeySyntaxError
     *
     * @return object
     */
    _check()
    {
        var rawRoutes = this._rawRoutes

        if (Object.keys(rawRoutes).length === 0) {
            throw new ObjectEmptyReferenceError('@param rawRoutes, object is empty.')
        }

        for (let key in rawRoutes) {
            var value = rawRoutes[key]

            if (key !== '__legend') {

                if (('routes' in value) === false) {
                    throw new RoutesKeyReferenceError('@param rawRoutes, routes does not exist, see routing "' + key + '".')
                }

                if (('initialize' in value) === false) {
                    throw new InitializeKeyReferenceError('@param rawRoutes, initialize does not exist, see routing "' + key + '".')
                }

                if (value['initialize'].indexOf('::') <= 0 ) {
                    throw new InitializeKeySyntaxError('@param rawRoutes, initialize is not a valid key, see routing "' + key + '".')
                }

                var init = value['initialize'].split('::')
                var controller = init[0]
                try {
                    var req = require(controller)
                } catch(error) {
                    if (error instanceof Error && error.code === 'MODULE_NOT_FOUND') {
                        throw new ModuleNotFoundError('@param controller, ' + controller + ' does not found, see routing "' + key + '".')
                    } else {
                        throw error
                    }
                }

                var action = init[1]
                if (!req.toString().match(action + '(.*?)')) {
                    throw new ActionKeyReferenceError('@param action, ' + action + ' does not exist, see routing "' + key + '".')
                }
            } else if (key === '__legend') {
                if ('regex' in value) {
                    for (let k in value['regex']) {
                        var v = value['regex'][k]
                        if (!k.match(/^{(.+?)}$/)) {
                            throw new RegexKeySyntaxError('@param rawRoutes, ' + k + ' is not a valid key, see __legend regex "' + k + '".')
                        }
                    }
                }
            }
        }

        return this._rawRoutes
    }
}

