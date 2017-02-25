/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester      = require('@cyrhla/tester/Tester')
const CheckRoutes = require('../../Routes/CheckRoutes')

/**
 * CheckRoutesTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class CheckRoutesTest extends Tester
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
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSame'
                }
            },
            routing2: {
                etc: {
                    initialize: '@cyrhla/tester/Tester::assertSame',
                    contentType: 'text/html',
                    expires: '-1',
                    cacheControl: 'cache',
                    methods: ['GET']
                }
            },
            routing3: {
                contact: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    contentType: 'text/html',
                    expires: '-1',
                    cacheControl: 'cache',
                    methods: ['GET']
                }
            },
            routing4: {
                abc: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Tester',
                    contentType: 'text/html'
                }
            },
            routing5: {
                some: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Testerrrr::assertSame',
                    contentType: 'text/html',
                    cacheControl: 'cache'
                }
            },
            routing6: {
                abc: {
                    routes: [
                        '/:controller(home)/',
                        '/:controller(home)/:lang({lang})/',
                        '/:controller(some)/:some({example})/'
                    ],
                    initialize: '@cyrhla/tester/Tester::assertSameeee',
                    contentType: 'text/html',
                    expires: '-1',
                    cacheControl: 'cache',
                    methods: ['GET']
                }
            },
            routing7: {
                '__legend': {
                    regex: {
                        'example}': '[0-9a-zA-Z_-]+'
                    }
                },
                home: {
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
        this.assertInstanceOf(CheckRoutes, new CheckRoutes(this.getRouting().routing1))
    }

    testContructorArgumentInvalidTypeError()
    {
        // Invalid rawRoutes.
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes('')
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(0)
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(null)
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(false)
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(Object)
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes([])
        })
        this.expectError('InvalidTypeError', function() {
            new CheckRoutes(undefined)
        })
    }

    testContructorCheckErrors()
    {
        var self = this

        this.expectError('ObjectEmptyReferenceError', function() {
            new CheckRoutes({})
        })
        this.expectError('RoutesKeyReferenceError', function() {
            new CheckRoutes(self.getRouting().routing2)
        })
        this.expectError('InitializeKeyReferenceError', function() {
            new CheckRoutes(self.getRouting().routing3)
        })
        this.expectError('InitializeKeySyntaxError', function() {
            new CheckRoutes(self.getRouting().routing4)
        })
        this.expectError('ModuleNotFoundError', function() {
            new CheckRoutes(self.getRouting().routing5)
        })
        this.expectError('ActionKeyReferenceError', function() {
            new CheckRoutes(self.getRouting().routing6)
        })
        this.expectError('RegexKeySyntaxError', function() {
            new CheckRoutes(self.getRouting().routing7)
        })
    }

    test_checkReturnsObject()
    {
        var checkRoutes = new CheckRoutes(this.getRouting().routing1)

        this.assertSame(this.getRouting().routing1, checkRoutes._check())
    }
}

