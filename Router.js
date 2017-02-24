/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const valid        = require('@cyrhla/tester/valid')
const Matcher      = require('@cyrhla/router/Matcher/Matcher')
const UrlGenerator = require('@cyrhla/router/Generator/UrlGenerator')

/**
 * The Router converts the URL path to run the appropriate controller
 * and generates the URLs.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class Router
{
    /**
     * Initializes this class with the given options.
     *
     * @param Matcher      matcher
     * @param UrlGenerator urlGenerator
     */
    constructor(matcher, urlGenerator)
    {
        valid(matcher, Matcher)
        valid(urlGenerator, UrlGenerator)

        /** @type Route */
        this._route = matcher.getRoute()

        /** @type UrlGenerator */
        this._urlGenerator = urlGenerator
    }

    /**
     * Gets the route.
     *
     * @return Route
     */
    getRoute()
    {
        return this._route
    }

    /**
     * Gets the URL.
     *
     * @param object  urlObj
     * @param boolean entities Default true
     *
     * @return string
     */
    getUrl(urlObj = {}, entities = true)
    {
        valid(urlObj, 'object')
        valid(entities, 'boolean')

        return this._urlGenerator.getUrl(urlObj, entities)
    }
}

