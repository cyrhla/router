/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester        = require('@cyrhla/tester/Tester')
const ReverseRoutes = require('../../Routes/ReverseRoutes')

/**
 * ReverseRoutesTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class ReverseRoutesTest extends Tester
{
    getRouting()
    {
        return {
            routing: {
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
                    initialize: '@cyrhla/tester/Tester::assertSame',
                },
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
        this.assertInstanceOf(ReverseRoutes, new ReverseRoutes({}, '_parts'))
    }

    testContructorArgumentInvalidTypeError()
    {
        // Invalid rawRoutes.
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes('', '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(0, '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(null, '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(false, '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(Object, '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(Symbol('foo'), '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(/^/, '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes([], '_parts')
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes(undefined, '_parts')
        })

        // Invalid keySuffix.
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, 0)
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, null)
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, false)
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, Object)
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, new Object())
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, /^/)
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, [])
        })
        this.expectError('InvalidTypeError', function() {
            new ReverseRoutes({}, undefined)
        })
    }

    testGetRegexReturnsObject()
    {
        var obj = {
            '{slug}':   '[a-zA-Z0-9_-]+',
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

        this.assertSame(obj, new ReverseRoutes({}, '_parts').getRegex())
    }

    testAllReturnsObject()
    {
        var reverseRoutes = new ReverseRoutes({}, '_parts')
        this.assertSame({}, reverseRoutes.all())

        var reverseRoutes = new ReverseRoutes(this.getRouting().routing, '_parts')

        this.assertSame('/:controller(api)/', reverseRoutes.all()['3_parts']['/api/'].getActiveRoute())

        var key = '/([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*)+/blog/'
        this.assertSame(key, reverseRoutes.all()['4_parts'][key].getActiveRegex())
    }

    test_reverseArgumentInvalidTypeError()
    {
        // Invalid wrapRoutes.
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = ''
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = 0
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = null
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = false
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = Object
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = Symbol('foo')
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = /^/
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = []
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = undefined
            var legendRegex = {}
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })

        // Invalid legendRegex.
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = ''
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = 0
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = null
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = false
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = Object
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = Symbol('foo')
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = /^/
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = []
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
        this.expectError('InvalidTypeError', function() {
            var wrapRoutes = {}
            var legendRegex = undefined
            new ReverseRoutes({}, '_parts')._reverse(wrapRoutes, legendRegex)
        })
    }

    test_reverseReturnsObject()
    {
        var reverseRoutes = new ReverseRoutes({}, '_parts')
        var wrapRoutes = {}
        var legendRegex = {}

        this.assertSame({}, reverseRoutes._reverse(wrapRoutes, legendRegex))
    }
}

