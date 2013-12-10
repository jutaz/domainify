var lib = require('../main');
var parser = new lib('my.beautiful.domain', {}, [function(dom, raw, next) {
    console.log(raw);
    next();
}, function(dom, raw, next) {
    console.log(dom);
    dom.test = 'I`m here!';
    next();
}]);

parser('your.ugly.domain.name.io', function(err, result) {
    if(err) {
        throw new Error(err);
    }
    console.log(result);
});