/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const valid = require('@cyrhla/tester/valid')
const Route = require('@cyrhla/router/Route/Route')

/**
 * Reverses the routes on a regular expression.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class ReverseRoutes
{
    /**
     * Initializes this class with the given options.
     *
     * @param object rawRoutes
     * @param string keySuffix
     */
    constructor(rawRoutes, keySuffix)
    {
        valid(rawRoutes, 'object')
        valid(keySuffix, 'string')

        /** @type object */
        this._data = {}

        /** @type string */
        this._keySuffix = keySuffix

        var legendRegex = {}
        if ('@legend' in rawRoutes && 'regex' in rawRoutes['@legend']) {
            legendRegex = rawRoutes['@legend'].regex
        }

        delete rawRoutes['@legend']

        this._data = this._reverse(rawRoutes, legendRegex)
    }

    /**
     * Generates an object of regular expressions.
     *
     * @return object
     */
    getRegex()
    {
        return {
            '{slug}':   '[a-zA-Z0-9_-]+', // default
            '{digit}':  '[0-9-]+',
            '{alpha}':  '[a-zA-Z]+',
            '{lang}':   '([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+',
            '{nick}':   '([a-zA-Z_-]+[a-zA-Z0-9_-]*)+',
            '{pagina}': '([1-9]+[0-9]*)+',
            '{year}':   '[0-9]+',
            '{month}':  '(0[1-9]|1[0-2])+',
            '{day}':    '(0[1-9]|[1-2][0-9]|3[0-1])+',
            '{*}':      '(.*?)+'
        }
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

    /**
     * Reverses the routes on a regular expression.
     *
     * @param object rawRoutes
     * @param object legendRegex
     *
     * @return object
     */
    _reverse(rawRoutes, legendRegex)
    {
        valid(rawRoutes, 'object')
        valid(legendRegex, 'object')

        var regexObj = Object.assign(this.getRegex(), legendRegex)

        var reverseRoutes = {}
        for (let key in rawRoutes) {
            var value = rawRoutes[key]
            var temp = 'routes' in value ? value['routes'] : []

            for (let val of temp) {
                var fragRoute = val.split('/')
                var fragLen = fragRoute.length
                var activeRouteRegexPath = []

                for (let frag of fragRoute) {
                    var matchParam = frag.match(/^:(.+?)\((.+?)\)$/)
                    if (matchParam) {
                        if (matchParam[2] in regexObj) {
                            var regexKey = regexObj[matchParam[2]]
                        } else {
                            var regexKey = regexObj['{slug}']
                        }
                        activeRouteRegexPath.push(matchParam[2].replace(/{(.*?)}/, regexKey))
                    } else {
                        activeRouteRegexPath.push(frag)
                    }
                }

                var raw = Object.assign({}, value)
                delete raw['routes']

                activeRouteRegexPath = activeRouteRegexPath.join('\/')
                var route = new Route(raw)
                    .setKey(key)
                    .setActiveRoute(val)
                    .setActiveRegex(activeRouteRegexPath)

                var nKey = fragLen + this._keySuffix
                if ((nKey in reverseRoutes) === false) {
                    reverseRoutes[nKey] = {}
                }
                reverseRoutes[nKey][activeRouteRegexPath] = route
            }
        }

        return reverseRoutes
    }
}

