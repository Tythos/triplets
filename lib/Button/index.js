/**
 * 
 */

define(function(require, exports, module) {
    const Trip = require("lib/Trip");

    class Button extends Trip {
        constructor() {
            super();
            this.bind("button", "click");
        }
    }

    return Object.assign(Button, {
        "__url__": "",
        "__semver__": "",
        "__license__": "",
        "__deps__": {}
    });
});
