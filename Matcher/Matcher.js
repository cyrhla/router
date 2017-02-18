/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const is     = require('@cyrhla/tester/is')
const valid  = require('@cyrhla/tester/valid')
const Routes = require('@cyrhla/router/Routes/Routes')
const Route  = require('@cyrhla/router/Route/Route')

/**
 * Creates an object Route representing the matched route.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class Matcher
{
    /**
     * Initializes this class with the given options.
     *
     * @param Routes routes
     * @param string requestMethod
     * @param string requestUrl
     */
    constructor(routes, requestMethod, requestUrl)
    {
        valid(routes, Routes)
        valid(requestMethod, 'string')
        valid(requestUrl, 'string')

        /** @type Routes */
        this._routes = routes

        /** @type string */
        this._requestMethod = requestMethod

        /** @type string */
        this._requestUrl = requestUrl

        /** @type array */
        this._requestUrlArr = requestUrl.split('/')
    }

    /**
     * Gets the Route.
     *
     * @return Route
     */
    getRoute()
    {
        var requestLen = this._requestUrlArr.length

        var key = requestLen + this._routes.getKeySuffix()

        if ((key in this._routes.all()) === false) {
            return new Route()
        }

        return this._matcher(this._routes.all()[key])
    }

    /**
     * Checks if the given route regex matches the given URL.
     *
     * @param object routesParts
     *
     * @return Route
     */
    _matcher(routesParts)
    {
        valid(routesParts, 'object')

        for (let key in routesParts) {
            var value = routesParts[key]
            if (!this._requestUrl.match('^' + key + '$')) {
                continue
            }

            // If the methods is accepted.
            if (value.getMethods() && !this._isAcceptedMethods(value.getMethods())) {
                continue
            }

            var params = this._extractRouteParams(value.getActiveRoute())
            value.setParams(params)

            return value
        }

        return new Route()
    }

    /**
     * Checks if the methods are acceptable.
     *
     * @param string|array methods
     *
     * @return boolean
     */
    _isAcceptedMethods(methods)
    {
        valid(methods, 'string', 'array')

        if (is(methods, 'string')) {
            methods = methods.split('|')
        }

        if (
            methods.indexOf('GET') !== -1 && this._requestMethod === 'GET' ||
            methods.indexOf('PUT') !== -1 && this._requestMethod === 'PUT' ||
            methods.indexOf('POST') !== -1 && this._requestMethod === 'POST' ||
            methods.indexOf('HEAD') !== -1 && this._requestMethod === 'HEAD' ||
            methods.indexOf('*') !== -1
        ) {
            return true
        }

        return false
    }

    /**
     * Extract the parameters from the route.
     *
     * @param string activeRoute
     *
     * @return object
     */
    _extractRouteParams(activeRoute)
    {
        valid(activeRoute, 'string')

        var fragRoute = activeRoute.split('/')
        var routeParams = {}
        for (let [i, value] of fragRoute.entries()) {
            var matchParam = value.match(/^:(.+?)\((.+?)\)$/)
            if (matchParam) {
                if (this._requestUrlArr[i]) {
                    routeParams[matchParam[1]] = this._requestUrlArr[i]
                }
            }
        }

        return routeParams
    }
}

