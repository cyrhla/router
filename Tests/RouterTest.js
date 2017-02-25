/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester       = require('@cyrhla/tester/Tester')
const Router       = require('../Router')
const Routes       = require('../Routes/Routes')
const Route        = require('../Route/Route')
const Matcher      = require('../Matcher/Matcher')
const UrlGenerator = require('../Generator/UrlGenerator')

/**
 * RouterTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class RouterTest extends Tester
{
    before()
    {
        this.routes = this.createMocker(Routes)
            .setMethod('all', function() {
                return {}
            })
            .compile()

        this.matcher = this.createMocker(Matcher, [this.routes, 'GET', 'http://example.com'])
            .setMethod('getRoute', function() {
                return new Route({})
            })
            .compile()

        this.urlGenerator = this.createMocker(UrlGenerator, ['example.com', 'http://www.example.com/controller/action', 'http', true, true, true, 'index_dev.js', false])
            .setMethod('getUrl', function() {
                return 'http://www.example.com'
            })
            .compile()
    }

    testInstanceOf()
    {
        var router = new Router(this.matcher, this.urlGenerator)

        this.assertInstanceOf(Router, router)
    }

    testContructorArgumentInvalidTypeError()
    {
        var self = this

        // Invalid matcher.
        this.expectError('InvalidTypeError', function() {
            new Router('', self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(0, self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(null, self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(false, self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(Object, self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(new Object(), self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(Symbol('foo'), self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(/^/, self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router([], self.urlGenerator)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(undefined, self.urlGenerator)
        })

        // Invalid urlGenerator.
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, '')
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, 0)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, null)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, false)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, Object)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, new Object())
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, /^/)
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, [])
        })
        this.expectError('InvalidTypeError', function() {
            new Router(self.matcher, undefined)
        })
    }

    testGetRouteReturnsRoute()
    {
        var router = new Router(this.matcher, this.urlGenerator)

        this.assertInstanceOf(Route, router.getRoute())
    }

    testGetUrlArgumentInvalidTypeError()
    {
        var router = new Router(this.matcher, this.urlGenerator)

        // Invalid urlObj.
        this.expectError('InvalidTypeError', function() {
            router.getUrl('')
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl(0)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl(null)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl(false)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl(Object)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl(/^/)
        })

        // Invalid entities.
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, '')
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, 0)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, null)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, Object)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, new Object())
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, /^/)
        })
        this.expectError('InvalidTypeError', function() {
            router.getUrl({}, [])
        })
    }

    testGetUrlReturnsString()
    {
        var router = new Router(this.matcher, this.urlGenerator)

        this.assertSame('http://www.example.com', router.getUrl())
        this.assertSame('http://www.example.com', router.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1', '#': 'top' }, false))
    }
}

