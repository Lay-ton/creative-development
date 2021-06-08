import moment from 'moment'
// base model wrapper class could be used for any model including user/product/etc..
class Model {
    constructor() {
        this._setCookies = [];
    }

    get cookies() {
        return this._setCookies;
    }

    setCookie(name, value, expires = null, httpOnly = false) {
        this._setCookies.push({name, value, options: {
                expires, httpOnly, encode: (val) => val, overwrite: true
            }});
        this._setCookies.forEach((cookie) => {
            console.log('SID: ' + cookie);
        })
    }

    /**
     * Drops cookie by name
     */
    dropCookie(name) {
        this.setCookie(name, '', moment.utc(1).toDate())
    }

}

export default Model;