/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester = require('@cyrhla/tester/Tester')
const Route  = require('../../Route/Route')

/**
 * RouteTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class RouteTest extends Tester
{
    getRouting()
    {
        return {
            routing1: {
                home: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame'
                }
            },
            routing2: {
                foo: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame',
                    contentType: 'text/html',
                    expires: '-1',
                    cacheControl: 'cache',
                    methods: ['GET']
                }
            }
        }
    }

    testInstanceOf()
    {
        this.assertInstanceOf(Route, new Route({}))
    }

    testContructorArgumentInvalidTypeError()
    {
        // Invalid route.
        this.expectError('InvalidTypeError', function() {
            new Route('')
        })
        this.expectError('InvalidTypeError', function() {
            new Route(0)
        })
        this.expectError('InvalidTypeError', function() {
            new Route(null)
        })
        this.expectError('InvalidTypeError', function() {
            new Route(false)
        })
        this.expectError('InvalidTypeError', function() {
            new Route(Object)
        })
        this.expectError('InvalidTypeError', function() {
            new Route(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            new Route(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            new Route([])
        })
    }

    testToStringRetrurnsString()
    {
        var route = new Route({})

        this.assertSame('{}', route.toString())
    }

    testSetParamsArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid params.
        this.expectError('InvalidTypeError', function() {
            route.setParams('')
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setParams(undefined)
        })
    }

    testSetParamsReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setParams({}))
    }

    testGetParamsReturnsObject()
    {
        var route = new Route()

        this.assertSame({}, route.getParams())

        route.setParams(this.getRouting().routing1)
        this.assertSame(this.getRouting().routing1, route.getParams())
    }

    testSetActiveRouteArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid activeRoute.
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRoute(undefined)
        })
    }

    testSetActiveRouteReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setActiveRoute(''))
    }

    testGetActiveRouteReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getActiveRoute())

        route.setActiveRoute('/foo')
        this.assertSame('/foo', route.getActiveRoute())
    }

    testSetActiveRegexArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid activeRegex.
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setActiveRegex(undefined)
        })
    }

    testSetActiveRegexReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setActiveRegex('^'))
    }

    testGetActiveRegexReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getActiveRegex())

        route.setActiveRegex('^')
        this.assertSame('^', route.getActiveRegex())
    }

    testSetInitializeArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid initialize.
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setInitialize(undefined)
        })
    }

    testSetInitializeReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setInitialize('@some/module/SomeClass::actionMethod'))
    }

    testGetInitializeReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getInitialize())

        route.setInitialize('@some/module/SomeClass::actionMethod')
        this.assertSame('@some/module/SomeClass::actionMethod', route.getInitialize())
    }

    testSetMethodsArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid methods.
        this.expectError('InvalidTypeError', function() {
            route.setMethods(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setMethods(undefined)
        })
    }

    testSetMethodsReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setMethods(['GET', 'POST']))
    }

    testGetMethodsReturnsNullOrStringOrArray()
    {
        var route = new Route()

        this.assertSame(null, route.getMethods())

        route.setMethods('GET|POST')
        this.assertSame('GET|POST', route.getMethods())

        route.setMethods(['GET', 'POST'])
        this.assertSame(['GET', 'POST'], route.getMethods())
    }

    testGetControllerReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getController())

        route.setInitialize('@some/module/SomeClass')
        this.assertSame(null, route.getController())

        route.setInitialize('@some/module/SomeClass::actionMethod')
        this.assertSame('@some/module/SomeClass', route.getController())
    }

    testGetActionReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getAction())

        route.setInitialize('@some/module/SomeClass')
        this.assertSame(null, route.getAction())

        route.setInitialize('@some/module/SomeClass::actionMethod')
        this.assertSame('actionMethod', route.getAction())
    }

    testSetCacheControlArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid cacheControl.
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setCacheControl(undefined)
        })
    }

    testSetCacheControlReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setCacheControl('no-cache'))
    }

    testGetCacheControlReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getCacheControl())

        route.setCacheControl('no-cache')
        this.assertSame('no-cache', route.getCacheControl())
    }

    testSetContentTypeArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid contentType.
        this.expectError('InvalidTypeError', function() {
            route.setContentType(0)
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setContentType(undefined)
        })
    }

    testSetContentTypeReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setContentType('text/html'))
    }

    testGetContentTypeReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getContentType())

        route.setContentType('text/html')
        this.assertSame('text/html', route.getContentType())
    }

    testSetExpiresArgumentInvalidTypeError()
    {
        var route = new Route()

        // Invalid expires.
        this.expectError('InvalidTypeError', function() {
            route.setExpires(null)
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires(false)
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires(Object)
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires([])
        })
        this.expectError('InvalidTypeError', function() {
            route.setExpires(undefined)
        })
    }

    testSetExpiresReturnsSelf()
    {
        var route = new Route()

        this.assertInstanceOf(Route, route.setExpires(-1))
    }

    testGetExpiresReturnsNullOrString()
    {
        var route = new Route()

        this.assertSame(null, route.getExpires())

        route.setExpires('-1')
        this.assertSame('-1', route.getExpires())
    }

    testAllReturnsObject()
    {
        var route = new Route()

        this.assertSame({}, route.all())

        var obj = this.getRouting().routing2.foo
        var route = new Route(obj)
        this.assertSame(obj, route.all())
    }
}

