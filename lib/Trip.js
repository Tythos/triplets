/**
 * 
 */

define(function(require, exports, module) {
    class Trip {
        constructor() {
            this.fields = {};
            this.listeners = {};
            this.bindings = {};
        }

        bind(selector, tag) {
            if (!this.bindings.hasOwnProperty(selector)) {
                this.bindings[selector] = [];
            }
            this.bindings[selector].push(tag);
        }

        set(field, value) {
            this.fields[field] = value;
            return this;
        }

        on(tag, listener) {
            if (!this.listeners.hasOwnProperty(tag)) {
                this.listeners[tag] = [];
            }
            this.listeners[tag].push(listener);
            return this;
        }

        fire(tag, event) {
            if (!this.listeners.hasOwnProperty(tag)) {
                this.listeners[tag] = [];
            }
            this.listeners[tag].forEach(function(listener) {
                listener(event);
            });
        }

        append(parent=null) {
            if (parent == null) {
                parent = window.document.body;
            }
            let div = window.document.createElement("div");
            div.innerHTML = this.constructor.TEMPLATE(this.fields);
            Object.keys(this.bindings).forEach(function(selector) {
                let tag = this.bindings[selector];
                div.querySelector(selector).addEventListener(tag, function(event) {
                    this.fire(tag, event);
                }.bind(this));
            }, this);
            Array.from(div.children).forEach(function(child) {
                parent.appendChild(child);
            });
        }
    }

    return Object.assign(Trip, {
        "__url__": "",
        "__semver__": "",
        "__license__": "",
        "__deps__": {}
    });
});
