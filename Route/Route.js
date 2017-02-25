/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const valid = require('@cyrhla/tester/valid')

/**
 * The Route represents the scheme of the route.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class Route
{
    /**
     * Initializes this class with the given options.
     *
     * @param object route Default empty object
     */
    constructor(route = {})
    {
        valid(route, 'object')

        /** @type object */
        this._route = route
    }

    /**
     * Reads route into a string.
     *
     * @return string
     */
    toString()
    {
        return JSON.stringify(this._route)
    }

    /**
     * Sets the key.
     *
     * @param string key
     *
     * @return self The invoked object.
     */
    setKey(key)
    {
        valid(key, 'string')

        this._route['key'] = key

        return this
    }

    /**
     * Gets the key.
     *
     * @return null|string
     */
    getKey()
    {
        if (('key' in this._route) === false) {
            return null
        }

        return this._route['key']
    }

    /**
     * Sets the params.
     *
     * @param object params
     *
     * @return self The invoked object.
     */
    setParams(params)
    {
        valid(params, 'object')

        this._route['params'] = params

        return this
    }

    /**
     * Gets the params.
     *
     * @return object
     */
    getParams()
    {
        if (('params' in this._route) === false) {
            return {}
        }

        return this._route['params']
    }

    /**
     * Sets the active route.
     *
     * @param string activeRoute
     *
     * @return self The invoked object.
     */
    setActiveRoute(activeRoute)
    {
        valid(activeRoute, 'string')

        this._route['activeRoute'] = activeRoute

        return this
    }

    /**
     * Gets the active route.
     *
     * @return null|string
     */
    getActiveRoute()
    {
        if (('activeRoute' in this._route) === false) {
            return null
        }

        return this._route['activeRoute']
    }

    /**
     * Sets the active regex.
     *
     * @param string activeRegex
     *
     * @return self The invoked object.
     */
    setActiveRegex(activeRegex)
    {
        valid(activeRegex, 'string')

        this._route['activeRegex'] = activeRegex

        return this
    }

    /**
     * Gets the active regex.
     *
     * @return null|string
     */
    getActiveRegex()
    {
        if (('activeRegex' in this._route) === false) {
            return null
        }

        return this._route['activeRegex']
    }

    /**
     * Sets the initialize controller and action.
     *
     * @param string initialize
     *
     * @return self The invoked object.
     */
    setInitialize(initialize)
    {
        valid(initialize, 'string')

        this._route['initialize'] = initialize

        return this
    }

    /**
     * Gets the initialize controller and action.
     *
     * @return null|string
     */
    getInitialize()
    {
        if (('initialize' in this._route) === false) {
            return null
        }

        return this._route['initialize']
    }

    /**
     * Sets the methods.
     *
     * @param string|array methods
     *
     * @return self The invoked object.
     */
    setMethods(methods)
    {
        valid(methods, 'string', 'array')

        this._route['methods'] = methods

        return this
    }

    /**
     * Gets the methods.
     *
     * @return null|string|array
     */
    getMethods()
    {
        if (('methods' in this._route) === false) {
            return null
        }

        return this._route['methods']
    }

    /**
     * Gets the controller.
     *
     * @return null|string
     */
    getController()
    {
        var initialize = this.getInitialize()
        if (initialize) {
            if (initialize.indexOf('::') > 0) {
                initialize = initialize.split('::')
                return initialize[0]
            }
        }

        return null
    }

    /**
     * Gets the action.
     *
     * @return null|string
     */
    getAction()
    {
        var initialize = this.getInitialize()
        if (initialize) {
            if (initialize.indexOf('::') > 0) {
                initialize = initialize.split('::')
                return initialize[1]
            }
        }

        return null
    }

    /**
     * Sets the "Cache-Control" header.
     *
     * @param string cacheControl
     *
     * @return self The invoked object.
     */
    setCacheControl(cacheControl)
    {
        valid(cacheControl, 'string')

        this._route['cacheControl'] = cacheControl

        return this
    }

    /**
     * Gets the "Cache-Control" header.
     *
     * @return null|string
     */
    getCacheControl()
    {
        if (('cacheControl' in this._route) === false) {
            return null
        }

        return this._route['cacheControl']
    }

    /**
     * Sets the "Content-Type" header.
     *
     * @param string contentType
     *
     * @return self The invoked object.
     */
    setContentType(contentType)
    {
        valid(contentType, 'string')

        this._route['contentType'] = contentType

        return this
    }

    /**
     * Gets the "Content-Type" header.
     *
     * @return null|string
     */
    getContentType()
    {
        if (('contentType' in this._route) === false) {
            return null
        }

        return this._route['contentType']
    }

    /**
     * Sets the "Expires" header.
     *
     * @param number|string expires
     *
     * @return self The invoked object.
     */
    setExpires(expires)
    {
        valid(expires, 'number', 'string')

        this._route['expires'] = expires

        return this
    }

    /**
     * Gets the "Expires" header.
     *
     * @return null|number|string
     */
    getExpires()
    {
        if (('expires' in this._route) === false) {
            return null
        }

        return this._route['expires']
    }

    /**
     * Gets all elements.
     *
     * @return object
     */
    all()
    {
        return this._route
    }
}
