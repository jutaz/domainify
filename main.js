module.exports = function(template, opts, middleware) {
    if(!opts) {
        opts = {
            defaultTemplate: true
        };
    }
    this.reserved = ["tld", "subdomainCount", "subdomains", "name", "fits"];
    if('string' == typeof template) {
        tmpl = template.split('.');
        template = [];
        for(var i in tmpl) {
            template.push(tmpl[i]);
        }
    }
    if("function" == typeof middleware) {
        middleware = [middleware];
    }
    this.middleware = middleware;
    this.template = template;
    this.useDefaultTemplate = opts.defaultTemplate;
    for(var i in this.template) {
        if(this.reserved.indexOf(this.template[i]) > -1) {
            throw new Error("Template contains reserved name, which is "+this.template[i]);
        }
    }
    return domain.bind(this);
}

function domain(rawDomain, callback) {
    dom = rawDomain.split('.');
    subdomains = dom.slice(0, dom.length-1);
    if(this.useDefaultTemplate) {
        dmn = {
            tld: null,
            subdomainCount: 0,
            name: '',
            subdomains: [],
            fits: false
        }
        dmn.tld = dom[dom.length-1];
        dmn.subdomainCount = subdomains.length;
        dmn.subdomains = subdomains;
        dmn.name = dom[dom.length-2];
        dmn.original = rawDomain;
        cnt = dom.length-2;
        if(this.template.length == subdomains.length-1) {
            dmn.fits = true;
        }
    } else {
        dmn = {};
        cnt = dom.length
    }
    if(this.template) {
        for(var i = 0; i < dom.slice(0, cnt).length; i++) {
            if(this.template[i]) {
                dmn[this.template[i]] = (this.useDefaultTemplate) ? subdomains[i] : dom[i];
            }
        }
    }
    for(var i in this.middleware) {
        if(this.middleware[i+1] && 'function' == typeof this.middleware[i+1]) {
            middleware[i](dmn, rawDomain, this.middleware[i+1);
        } else {
            middleware[i](dmn, rawDomain, function() {
                callback(null, dmn);
            });
        }
    }
}