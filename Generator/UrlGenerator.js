/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const is    = require('@cyrhla/tester/is')
const valid = require('@cyrhla/tester/valid')

/**
 * Generates the URL.
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class UrlGenerator
{
    /**
     * Initializes this class with the given options.
     *
     * @param string      requestDomain
     * @param string      requestUrl
     * @param null|string protocol      Default null
     * @param boolean     www           Default true
     * @param boolean     absoluteUrl   Default true
     * @param boolean     nickSubdomain Default true
     * @param null|string indexDev      Default null
     * @param boolean     lastShlash    Default false
     */
    constructor(
        requestDomain,
        requestUrl,
        protocol      = null,
        www           = true,
        absoluteUrl   = true,
        nickSubdomain = true,
        indexDev      = null,
        lastShlash    = false
    ) {
        valid(requestDomain, 'string')
        valid(requestUrl, 'string')
        valid(protocol, 'null', 'string')
        valid(www, 'boolean')
        valid(absoluteUrl, 'boolean')
        valid(nickSubdomain, 'boolean')
        valid(indexDev, 'null', 'string')
        valid(lastShlash, 'boolean')

        /** @type string */
        this._requestDomain = requestDomain

        /** @type string */
        this.requestUrl = requestUrl

        /** @type null|string */
        this._protocol = protocol !== null ? protocol + ':' : ''

        /** @type boolean */
        this._www = www === true ? 'www.' : ''

        /** @type boolean */
        this._absoluteUrl = absoluteUrl

        /** @type boolean */
        this._nickSubdomain = nickSubdomain

        /** @type null|string */
        this._indexDev = indexDev !== null ? '/' + indexDev : ''

        /** @type boolean */
        this._lastShlash = lastShlash
    }

    /**
     * Gets the URL.
     *
     * @param array|object urlObj   Default empty object
     * @param boolean      entities Default true
     *
     * @return string
     */
    getUrl(urlObj = {}, entities = true)
    {
        valid(urlObj, 'array', 'object')
        valid(entities, 'boolean')

        if (Object.keys(urlObj).length === 0) {
            if (entities === true) {
                return this._toEntities(this.requestUrl)
            } else {
                return this.requestUrl
            }
        }

        var nick    = ''
        var anchor  = ''
        var qstring = ''
        var query   = []
        for (let key in urlObj) {
            var value = urlObj[key]
            if (is(value, 'object')) {
                if ('nick' in value && this._nickSubdomain === true) {
                    nick = value['nick']
                } else {
                    continue
                }
            } else if (key === 'nick' && this._nickSubdomain === true) {
                nick = value
            } else if (key === '?') {
                qstring = value
            } else if (value.charAt(0) === '?') {
                qstring = value.substr(1)
            } else if (key === '#') {
                anchor = '#' + value
            } else if (value.charAt(0) === '#') {
                anchor = value
            } else {
                query.push(value)
            }
        }

        qstring = qstring ? '?' + qstring : ''
        var shlash = this._lastShlash === true ? '/' : ''
        var path = query.join('/') + shlash

        var part
        if (this._absoluteUrl === true) {
            if (nick && this._nickSubdomain === true) {
                part = this._protocol + '//' + this._www + nick + '.' + this._requestDomain + this._indexDev
            } else {
                part = this._protocol + '//' + this._www + this._requestDomain + this._indexDev
            }
        } else {
            part = this._indexDev
        }

        var url = part + '/' + path + qstring + anchor

        if (entities === true) {
            url = this._toEntities(url)
        }

        return url
    }

    /**
     * Replaces the "&" on the "&amp;" in the URL.
     *
     * @param string str
     *
     * @return string
     */
    _toEntities(str)
    {
        valid(str, 'string')

        return str.replace(/&/g, '&amp;')
    }
}
