/**
 * 
 */

define(function(require, exports, module) {
    const handlebars = require("lib/handlebars/v4.0.11/index");

    function assertSingularCss(cssPath) {
        let head = window.document.head;
        let cssi = Array.from(head.querySelectorAll("link"));
        for (let i = 0; i < cssi.length; i++) {
            let css = cssi[i];
            if (css.getAttribute("href") == cssPath) {
                return;
            }
        }
        let link = window.document.createElement("link");
        link.setAttribute("href", cssPath);
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        window.document.head.appendChild(link);
    }

    /**
     * 
     * @param {String} name - Value passed to require() call (e.g., module path w/o extension)
     * @param {Function} req - Core "require()" method for invoking any other dependencies
     * @param {Function} onload - Invoked once loading is complete with return symbol
     * @param {Object} config - Collection of configuration parameters for core require()
     */
    exports.load = function(name, req, onload, config) {
        let cssPath = name + "/index.css";
        let htmlPath = name + "/index.html";
        let jsPath = name + "/index.js";

        // 1) assert singular CSS load
        assertSingularCss(cssPath);

        // 2) load module, check for template
        req([jsPath], function(mod) {
            if (!mod.TEMPLATE) {
                // 3) load and compile template
                fetch(htmlPath)
                    .then(response => response.text())
                    .then(text => {
                        mod.TEMPLATE = handlebars.compile(text);
                        onload(mod);
                    });
            } else {
                onload(mod);
            }
        });
    };

    return Object.assign(exports, {
        "__url__": "",
        "__semver__": "",
        "__license__": "",
        "__deps__": {}
    });
});
