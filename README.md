router
======
**This is development (master) version.<br> For production version (relase) see
<http://github.com/cyrhla/router/tree/v0.0.1>**
- Version: 0.0.1-dev
- Technologies:
  - JavaScript
- Copyright / Authors:
  - Krystian Pietruszka <kpietru@cyrhla.com>
- Licenses:
  - MIT <http://spdx.org/licenses/MIT>
- Download: <http://github.com/cyrhla/router/releases>
- Homepage: <http://www.cyrhla.com>
- More: package.json

The "router" converts the URL path to run the appropriate controller and generates the URLs.
____________________________________________________________________________________________

Install
-------

    npm install @cyrhla/router

Usage
-----

Simple example*:

    var requestUrl    = 'http://www.example.com/blog?foo=bar'
    var requestDomain = 'example.com'
    var method        = 'GET'

    var rawRoutes = {
        home: {
            routes: [
                '/',
                '/:lang({lang})'
            ],
            initialize: '@some/module/Controller/HomeController::indexAction'
        },
        blog: {
            routes: [
                '/:controller(blog)',
                '/:lang({lang})/:controller(blog)'
            ],
            initialize: '@some/module/Controller/BlogController::indexAction'
        }
    }

    var routes       = new Routes().add(rawRoutes)
    var matcher      = new Matcher(routes, method, requestUrl)
    var urlGenerator = new UrlGenerator(requestDomain, requestUrl)
    var router       = new Router(matcher, urlGenerator)

Initialization of the controller*:

    var controller = router.getRoute().getController()
    // @some/module/Controller/BlogController

    var action = router.getRoute().getAction()
    // indexAction

    controller = new (require(controller))()
    controller[action].apply(controller[action], {})

Generating URLs*:

    router.getUrl()
    // http://www.example.com/blog?foo=bar

    router.getUrl(['someController', 'someAction', '?a=b', '#top'])
    // /someController/someAction?a=b#top

    router.getUrl({ controller: 'someController', action: 'someAction', '?': 'a=b', '#': 'top' })
    // /someController/someAction?a=b#top

API
---

### Class Routes (Routes/Routes.js)

- Routes()
  - getKeySuffix(): string
  - add( object: __rawRoutes__, boolean: __check__ = false ): self
  - all(): object

### Class Matcher (Matcher/Matcher.js)

- Matcher( Routes: __routes__, string: __requestMethod__, string: __requestUrl__ )
  - getRoute(): Route

### Class Router (Router.js)

- Router( Matcher: __matcher__, UrlGenerator: __urlGenerator__ )
  - getRoute(): Route
  - getUrl( object: __urlObj__ = {}, boolean: __entities__ ): string

### Class Route (Route/Route.js)

- Route( object: __route__ = {} )
  - toString(): string
  - setParams( object: __params__ ): self
  - getParams(): object
  - setActiveRoute( string: __activeRoute__ ): self
  - getActiveRoute(): null|string
  - setActiveRegex( string: __activeRegex__ ): self
  - getActiveRegex(): null|string
  - setInitialize( string: __initialize__ ): self
  - getInitialize(): null|string
  - setMethods( string|array: __methods__ ): self
  - getMethods(): null|string|array
  - getController(): null|string
  - getAction(): null|string
  - setCacheControl( string: __cacheControl__ ): self
  - getCacheControl(): null|string
  - setContentType( string: __contentType__ ): self
  - getContentType(): null|string
  - setExpires( number|string: __expires__ ): self
  - getExpires(): null|number|string
  - all(): object

References
----------

1. [Node.js Documentation][1]

[1]: http://nodejs.org/api/modules.html

___________________________________________
[*] Paths should be modified to the module.
