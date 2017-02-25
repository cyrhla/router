/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester = require('@cyrhla/tester/Tester')
const Routes = require('../../Routes/Routes')

/**
 * RoutesTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class RoutesTest extends Tester
{
    getRouting()
    {
        return {
            routing1: {
                '__legend': {
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
                    initialize: '@cyrhla/tester/Tester::assertSame'
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
            }
        }
    }

    testInstanceOf()
    {
        this.assertInstanceOf(Routes, new Routes())
    }

    testGetKeySuffixReturnsString()
    {
        var routes = new Routes()

        this.assertSame('_parts', routes.getKeySuffix())
    }

    testAddArgumentInvalidTypeError()
    {
        var routes = new Routes()

        // Invalid rawRoutes.
        this.expectError('InvalidTypeError', function() {
            routes.add('')
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(0)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(null)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(false)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(Object)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add([])
        })
        this.expectError('InvalidTypeError', function() {
            routes.add(undefined)
        })

        // Invalid check.
        this.expectError('InvalidTypeError', function() {
            routes.add({}, '')
        })
        this.expectError('InvalidTypeError', function() {
            routes.add({}, 0)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add({}, Object)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add({}, new Object())
        })
        this.expectError('InvalidTypeError', function() {
            routes.add({}, Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            routes.add({}, /^/)
        })
        this.expectError('InvalidTypeError', function() {
            routes.add({}, [])
        })
    }

    testAddReturnsSelf()
    {
        var routes = new Routes()

        this.assertInstanceOf(Routes, routes.add({}))
        this.assertInstanceOf(Routes, routes.add(this.getRouting().routing1, true))
    }

    testAllReturnsObject()
    {
        var routes = new Routes()
            .add({})
        this.assertSame({}, routes.all())

        var routes = new Routes()
            .add(this.getRouting().routing1, true)
            .add(this.getRouting().routing2, true)

        this.assertSame('/:controller(api)/', routes.all()['3_parts']['/api/'].getActiveRoute())

        var key = '/([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+/api/'
        this.assertSame('/([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+/api/', routes.all()['4_parts'][key].getActiveRegex())
    }
}

