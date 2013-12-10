domainify
=========

Domain name parser for JS. Uses templates and middleware.

* Parses domain, and maps it to given scheme.
* Supports middleware, so you can process domain name yourself!

## Examples

Also check [examples](/examples/)

```js
var lib = require('domainify');
var parser = new lib('my.beautiful.domain');

parser('your.ugly.domain.name.io', function(err, result) {
    if(err) {
        throw new Error(err);
    }
    console.log(result);
    /*
    { tld: 'io',
      subdomainCount: 4,
      name: 'name',
      subdomains: [ 'your', 'ugly', 'domain', 'name' ],
      fits: true,
      original: 'your.ugly.domain.name.io',
      my: 'your',
      beautiful: 'ugly',
      domain: 'domain'
    }
    */
});

```
