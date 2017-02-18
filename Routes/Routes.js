/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const valid         = require('@cyrhla/tester/valid')
const CheckRoutes   = require('@cyrhla/router/Routes/CheckRoutes')
const ReverseRoutes = require('@cyrhla/router/Routes/ReverseRoutes')

/**
 * The collection of routes.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class Routes
{
    /**
     * Initializes this class.
     */
    constructor()
    {
        /** @type object */
        this._data = {} 
    }

    /**
     * Gets the key suffix.
     *
     * @return string
     */
    getKeySuffix()
    {
        return '_parts'
    }

    /**
     * Adds the routes.
     *
     * @param object  rawRoutes
     * @param boolean check     Default false
     *
     * @return self The invoked object.
     */
    add(rawRoutes, check = false)
    {
        valid(rawRoutes, 'object')
        valid(check, 'boolean')

        if (check === true) {
            new CheckRoutes(rawRoutes)
        }

        var reverseRoutes = new ReverseRoutes(rawRoutes, this.getKeySuffix()).all()
        for (let key in reverseRoutes) {
            let value = reverseRoutes[key]
            if (key in this._data) {
                this._data[key] = Object.assign(this._data[key], value)
            } else {
                this._data[key] = value
            }
        }

        return this
    }

    /**
     * Gets all elements.
     *
     * @return object
     */
    all()
    {
        return this._data
    }
}

