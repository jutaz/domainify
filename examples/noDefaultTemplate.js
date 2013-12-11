var lib = require('../main');
var parser = new lib('my.beautiful.domain.name.end', {defaultTemplate: false});

parser('your.ugly.domain.name.io', function(err, result) {
    if(err) {
        throw new Error(err);
    }
    console.log(result);
});