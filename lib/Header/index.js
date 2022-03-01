/**
 * 
 */

define(function(require, exports, module) {
    const Trip = require("lib/Trip");

    class Header extends Trip {
        constructor() {
            super();
            this.bind("h1", "mouseover");
        }
    }

    return Object.assign(Header, {
        "__url__": "",
        "__semver__": "",
        "__license__": "",
        "__deps__": {}
    });
});
