import moment from 'moment'


// base model wrapper class could be used for any model including user/product/etc..
class Model {
    constructor(req) {
        this._setCookies = [];
        this._setHeaders = [];
        this._setBody = {};
        this.req = req;
        this._responseCode = 200;
    }

    get responseCode() {
        return this._responseCode;
    }

    set responseCode(code) {
        this._responseCode = code;
    }

    get query() {
        return this.req.query;
    }

    get body() {
        return this._setBody;
    }

    set body(value) {
        this._setBody = value;
    }

    get params() {
        return this.req.params;
    }

    get headers() {
        return this._setHeaders;
    }

    get cookies() {
        return this._setCookies;
    }

    get objectCookies() {
        return this._setCookies.reduce((acc, cookie) => {
            acc[cookie.name] = cookie.value;
            return acc;
        }, {});
    }



    setCookie(name, value, expires = null, httpOnly = false) {
        this._setCookies.push({name, value, options: {
                expires, httpOnly, encode: (val) => val, overwrite: true
            }});
    }

    /**
     * Drops cookie by name
     */
    dropCookie(name) {
        this.setCookie(name, '', moment.utc(1).toDate())
    }

}

export default Model;