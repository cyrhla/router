/**
 * @package @cyrhla/router
 * @license MIT
 * @copyright Krystian Pietruszka <kpietru@cyrhla.com>
 * @see http://www.cyrhla.com
 */

'use strict'

const Tester       = require('@cyrhla/tester/Tester')
const UrlGenerator = require('../../Generator/UrlGenerator')

/**
 * UrlGeneratorTest
 *
 * @author Krystian Pietruszka <kpietru@cyrhla.com>
 */
module.exports = class UrlGeneratorTest extends Tester
{
    testInstanceOf()
    {
        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action',
            'https',
            true,
            true,
            true,
            'index_dev.js',
            false
        )

        this.assertInstanceOf(UrlGenerator, urlGenerator)
    }

    testContructorArgumentInvalidTypeError()
    {
        // Invalid requestUrl.
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 0, 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', null, 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', false, 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', Object, 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', new Object(), 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', Symbol('foo'), 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', /^/, 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', [], 'https', true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', undefined, 'https', true, true, true, 'index_dev.js', false
            )
        })

        // Invalid scheme.
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 0, true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', false, true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', Object, true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', new Object(), true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', Symbol('foo'), true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', /^/, true, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', [], true, true, true, 'index_dev.js', false
            )
        })

        // Invalid www.
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', '', true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', 0, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', null, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', Object, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', new Object(), true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', Symbol('foo'), true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', /^/, true, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', [], true, true, 'index_dev.js', false
            )
        })

        // Invalid absoluteUrl.
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, '', true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, 0, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, null, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, Object, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, new Object(), true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, Symbol('foo'), true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, /^/, true, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, [], true, 'index_dev.js', false
            )
        })

        // Invalid nickSubdomain.
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, '', 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, 0, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, null, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, Object, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, new Object(), 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, Symbol('foo'), 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, /^/, 'index_dev.js', false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, [], 'index_dev.js', false
            )
        })

        // Invalid indexDev.
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, 0, false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, false, false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, Object, false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, new Object(), false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, Symbol('foo'), false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, /^/, false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, [], false
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, ''
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, 0
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, null
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, Object
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, new Object()
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, Symbol('foo')
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, /^/
            )
        })
        this.expectError('InvalidTypeError', function() {
            var urlGenerator = new UrlGenerator(
                'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, null, []
            )
        })
    }

    testGetUrlArgumentInvalidTypeError()
    {
        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action?foo=bar&baz=1#top',
            'https',
            true,
            true,
            true,
            'index_dev.js',
            false
        )

        // Invalid urlObj.
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl('')
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl(0)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl(null)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl(false)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl(Object)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl(/^/)
        })

        // Invalid entities.
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, '')
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, 0)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, null)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, Object())
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, new Object())
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, /^/)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator.getUrl({}, [])
        })
    }

    testGetUrlReturnsString()
    {
        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action?foo=bar&baz=1#top',
            'https',
            true,
            true,
            true,
            'index_dev.js',
            false
        )
        this.assertSame('http://www.example.com/controller/action?foo=bar&amp;baz=1#top', urlGenerator.getUrl())
        this.assertSame('https://www.example.com/index_dev.js/a/b?foo=bar&amp;baz=1#top', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1', '#': 'top' }))
        this.assertSame('https://www.example.com/index_dev.js/a/b?foo=bar&amp;baz=1#top', urlGenerator.getUrl(['a', 'b', '?foo=bar&baz=1', '#top']))

        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action?foo=bar&baz=1#top',
            null,
            false,
            true,
            true,
            'index_dev.js',
            false
        )
        this.assertSame('//example.com/index_dev.js/a/b?foo=bar&amp;baz=1#top', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1', '#': 'top' }))
        this.assertSame('//example.com/index_dev.js/a/b?foo=bar&amp;baz=1#top', urlGenerator.getUrl(['a', 'b', '?foo=bar&baz=1', '#top']))
        this.assertSame('//akira.example.com/index_dev.js/a?foo=bar&amp;baz=1#top', urlGenerator.getUrl({ a: 'a', nick: 'akira', '?': 'foo=bar&baz=1', '#': 'top' }))
        this.assertSame('//akira.example.com/index_dev.js/a?foo=bar&amp;baz=1#top', urlGenerator.getUrl(['a', { nick: 'akira' }, '?foo=bar&baz=1', '#top']))

        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action?foo=bar&baz=1#top',
            'http',
            true,
            false,
            false,
            null,
            false
        )
        this.assertSame('/żółć', urlGenerator.getUrl({ a: 'żółć' }))
        this.assertSame('/a/b', urlGenerator.getUrl({ a: 'a', nick: 'b' }))
        this.assertSame('/ /b', urlGenerator.getUrl({ a: ' ', nick: 'b' }))
        this.assertSame('/a/b', urlGenerator.getUrl({ a: 'a', b: 'b' }))
        this.assertSame('/a/b?foo=bar&amp;baz=1', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1' }))
        this.assertSame('/a/b#top', urlGenerator.getUrl({ a: 'a', b: 'b', '#': 'top' }))
        this.assertSame('/a/b?foo=bar&amp;baz=1#top', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1', '#': 'top' }))
        this.assertSame('/a/b?foo=bar&amp;baz=1#top', urlGenerator.getUrl(['a', 'b', '?foo=bar&baz=1', '#top']))


        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action?foo=bar&baz=1#top',
            'http',
            true,
            false,
            false,
            null,
            true
        )
        this.assertSame('/żółć/', urlGenerator.getUrl({ a: 'żółć' }))
        this.assertSame('/a/b/', urlGenerator.getUrl({ a: 'a', nick: 'b' }))
        this.assertSame('/ /b/', urlGenerator.getUrl({ a: ' ', nick: 'b' }))
        this.assertSame('/a/b/', urlGenerator.getUrl({ a: 'a', b: 'b' }))
        this.assertSame('/a/b/?foo=bar&amp;baz=1', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1' }))
        this.assertSame('/a/b/#top', urlGenerator.getUrl({ a: 'a', b: 'b', '#': 'top' }))
        this.assertSame('/a/b/?foo=bar&amp;baz=1#top', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1', '#': 'top' }))
        this.assertSame('/a/b/?foo=bar&amp;baz=1#top', urlGenerator.getUrl(['a', 'b', '?foo=bar&baz=1', '#top']))

        var urlGenerator = new UrlGenerator(
            'example.com',
            'http://www.example.com/controller/action?foo=bar&baz=1#top',
            'http',
            true,
            false,
            false,
            'index_dev.js',
            true
        )
        this.assertSame('/index_dev.js/żółć/', urlGenerator.getUrl({ a: 'żółć' }))
        this.assertSame('/index_dev.js/a/b/', urlGenerator.getUrl({ a: 'a', nick: 'b' }))
        this.assertSame('/index_dev.js/ /b/', urlGenerator.getUrl({ a: ' ', nick: 'b' }))
        this.assertSame('/index_dev.js/a/b/', urlGenerator.getUrl({ a: 'a', b: 'b' }))
        this.assertSame('/index_dev.js/a/b/?foo=bar&baz=1', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1' }, false))
        this.assertSame('/index_dev.js/a/b/#top', urlGenerator.getUrl({ a: 'a', b: 'b', '#': 'top' }))
        this.assertSame('/index_dev.js/a/b/?foo=bar&baz=1#top', urlGenerator.getUrl({ a: 'a', b: 'b', '?': 'foo=bar&baz=1', '#': 'top' }, false))
        this.assertSame('/index_dev.js/a/b/?foo=bar&baz=1#top', urlGenerator.getUrl(['a', 'b', '?foo=bar&baz=1', '#top'], false))
    }

    test_toEntitiesArgumentInvalidTypeError()
    {
        var urlGenerator = new UrlGenerator(
            'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, 'index_dev.js', false
        )

        // Invalid str.
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(0)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(null)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(false)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(Object)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(new Object())
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(Symbol('foo'))
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(/^/)
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities([])
        })
        this.expectError('InvalidTypeError', function() {
            urlGenerator._toEntities(undefined)
        })
    }

    test_toEntitiesReturnsString()
    {
        var urlGenerator = new UrlGenerator(
            'example.com', 'http://www.example.com/controller/action', 'https', true, true, true, 'index_dev.js', false
        )

        this.assertSame('&amp;', urlGenerator._toEntities('&'))
        this.assertSame('a&amp;b&amp;żółć &amp; ', urlGenerator._toEntities('a&b&żółć & '))
    }
}
