/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

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
     * @param null|string scheme        Default null
     * @param boolean     www           Default true
     * @param boolean     absoluteUrl   Default true
     * @param boolean     nickSubdomain Default true
     * @param null|string indexDev      Default null
     * @param boolean     lastShlash    Default false
     */
    constructor(
        requestDomain,
        requestUrl,
        scheme        = null,
        www           = true,
        absoluteUrl   = true,
        nickSubdomain = true,
        indexDev      = null,
        lastShlash    = false
    ) {
        valid(requestDomain, 'string')
        valid(requestUrl, 'string')
        valid(scheme, 'null', 'string')
        valid(www, 'boolean')
        valid(absoluteUrl, 'boolean')
        valid(nickSubdomain, 'boolean')
        valid(indexDev, 'null', 'string')
        valid(lastShlash, 'boolean')

        /** @type string */
        this.requestDomain = requestDomain

        /** @type string */
        this.requestUrl = requestUrl

        /** @type null|string */
        this.scheme = scheme !== null ? scheme + ':' : ''

        /** @type boolean */
        this.www = www === true ? 'www.' : ''

        /** @type boolean */
        this.absoluteUrl = absoluteUrl

        /** @type boolean */
        this.nickSubdomain = nickSubdomain

        /** @type null|string */
        this.indexDev = indexDev !== null ? '/' + indexDev : ''

        /** @type boolean */
        this.lastShlash = lastShlash
    }

    /**
     * Gets the URL.
     *
     * @param array   urlObj
     * @param boolean entities Default true
     *
     * @return string
     */
    getUrl(urlObj = {}, entities = true)
    {
        valid(urlObj, 'object')
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
            if (key === 'nick' && this.nickSubdomain === true) {
                nick = value
            } else if (key === '?') {
                qstring = value
            } else if (key === '#') {
                anchor = '#' + value
            } else {
                query.push(value)
            }
        }

        qstring = qstring ? '?' + qstring : ''
        var shlash = this.lastShlash === true ? '/' : ''
        var path = query.join('/') + shlash

        var part
        if (this.absoluteUrl === true) {
            if (nick && this.nickSubdomain === true) {
                part = this.scheme + '//' + this.www + nick + '.' + this.requestDomain + this.indexDev
            } else {
                part = this.scheme + '//' + this.www + this.requestDomain + this.indexDev
            }
        } else {
            part = this.indexDev
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

