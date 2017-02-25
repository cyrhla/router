/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester  = require('@cyrhla/tester/Tester')
const Matcher = require('../../Matcher/Matcher')
const Routes  = require('../../Routes/Routes')
const Route   = require('../../Route/Route')

/**
 * MatcherTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class MatcherTest extends Tester
{
    getRouting()
    {
        return {
            routing1: {
                '@legend': {
                    regex: {
                        '{example}': '[0-9a-zA-Z_-]+'
                    }
                },
                home: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame'
                },
                blog: {
                    routes: [
                        '/:controller(blog)/',
                        '/:lang({lang})/:controller(blog)/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame',
                }
            },
            routing2: {
                api: {
                    routes: [
                        '/:controller(api)/',
                        '/:lang({lang})/:controller(api)/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame',
                    contentType: 'text/xml',
                    expires: '-1',
                    cacheControl: 'no-cache',
                    methods: ['GET', 'PUT', 'HEAD', 'POST']
                }
            },
            routing3: {
                żółć: {
                    routes: [
                        '/:controller(żółć)',
                        '/:lang({lang})/:controller(żółć)',
                        '/:lang({lang})/:controller(żółć)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame',
                    contentType: 'text/xml',
                    expires: '-1',
                    cacheControl: 'no-cache',
                    methods: 'GET|PUT|HEAD|POST'
                }
            }
        }
    }

    testInstanceOf()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        this.assertInstanceOf(Matcher, new Matcher(routes, 'GET', '/home/'))
    }

    testContructorArgumentInvalidTypeError()
    {
        // Invalid routes.
        this.expectError('InvalidTypeError', function() {
            new Matcher('', 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(0, 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(null, 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(false, 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(Object, 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(new Object, 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(Symbol('foo'), 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(/^/, 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher([], 'GET', '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(undefined, 'GET', '/home/')
        })

        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        // Invalid requestMethod.
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 0, '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, null, '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, false, '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, Object, '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, new Object(), '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, Symbol('foo'), '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, /^/, '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, [], '/home/')
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, undefined, '/home/')
        })

        // Invalid requestUrl.
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', 0)
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', null)
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', false)
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', Object)
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', new Object())
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', /^/)
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', [])
        })
        this.expectError('InvalidTypeError', function() {
            new Matcher(routes, 'GET', undefined)
        })
    }

    testGetRouteReturnsObject()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/en/blog/')
        this.assertSame('/:lang({lang})/:controller(blog)/', matcher.getRoute().getActiveRoute())
        this.assertSame('/([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+/blog/', matcher.getRoute().getActiveRegex())

        var matcher = new Matcher(routes, 'GET', '/en/żółć')
        this.assertSame('/:lang({lang})/:controller(żółć)', matcher.getRoute().getActiveRoute())
        this.assertSame('GET|PUT|HEAD|POST', matcher.getRoute().getMethods())

        var matcher = new Matcher(routes, 'POST', '/en/żółć/abc/')
        this.assertSame('/([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+/żółć/[a-zA-Z0-9_-]+/', matcher.getRoute().getActiveRegex())
        this.assertSame('/:lang({lang})/:controller(żółć)/:some({example})/', matcher.getRoute().getActiveRoute())

        var matcher = new Matcher(routes, 'POST', 'http://www.example.com/en/żółć/abc/')
        this.assertSame('/([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+/żółć/[a-zA-Z0-9_-]+/', matcher.getRoute().getActiveRegex())
        this.assertSame('/:lang({lang})/:controller(żółć)/:some({example})/', matcher.getRoute().getActiveRoute())
    }

    test_matcherArgumentInvalidTypeError()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/home/')

        // Invalid routesParts.
        this.expectError('InvalidTypeError', function() {
            matcher._matcher('')
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(0)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(null)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(false)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(Object)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher([])
        })
        this.expectError('InvalidTypeError', function() {
            matcher._matcher(undefined)
        })
    }

    test_matcherReturnsRoute()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/home/')

        this.assertInstanceOf(Route, matcher._matcher(routes.all()['3_parts']))
        this.assertSame('/:controller(home)/', matcher._matcher(routes.all()['3_parts']).getActiveRoute())
    }

    test_isAcceptedMethodsArgumentInvalidTypeError()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/home/')

        // Invalid methods.
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(0)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(null)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(false)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(Object)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._isAcceptedMethods(undefined)
        })
    }

    test_isAcceptedMethodsReturnsBoolean()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/home/')

        this.assertSame(true, matcher._isAcceptedMethods(['GET']))
        this.assertSame(true, matcher._isAcceptedMethods('GET|POST'))
        this.assertSame(false, matcher._isAcceptedMethods(['PUT', 'HEAD']))
        this.assertSame(true, matcher._isAcceptedMethods(['PUT', 'HEAD', 'GET']))
        this.assertSame(true, matcher._isAcceptedMethods('PUT|HEAD|GET'))
        this.assertSame(true, matcher._isAcceptedMethods('*'))
        this.assertSame(true, matcher._isAcceptedMethods(['*']))
    }

    test_extractRouteParamsArgumentInvalidTypeError()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/home/')

        // Invalid activeRoute.
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(0)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(null)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(false)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(Object)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams([])
        })
        this.expectError('InvalidTypeError', function() {
            matcher._extractRouteParams(undefined)
        })
    }

    test_extractRouteParamsReturnsObject()
    {
        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)
            .add(this.getRouting().routing3, true)

        var matcher = new Matcher(routes, 'GET', '/en/żółć/abc/')

        var obj = { lang: 'en', controller: 'żółć', some: 'abc' }
        this.assertSame(obj, matcher._extractRouteParams('/:lang({lang})/:controller(żółć)/:some({example})/'))
    }
}
