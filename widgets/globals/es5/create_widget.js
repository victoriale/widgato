'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// Version 0.1.0 globals https://github.com/passit/SNT-Widgets

/**
 * @function constructor
 *
 * @param string name - the element tag that will be the product name
 * @param string html - html Dom converted into a string
 * @param string style - css style converted into a string
 **/
var createWidget = function () {
    function createWidget(name, html, style) {
        _classCallCheck(this, createWidget);

        this.lineClamp = require('./line_clamp.js');
        this.fallbackImage = null;
        this.initialData();
        this.name = name;
        this.widgetEl = this.createElementNode(name, html, {
            style: "display:block"
        });
        this.style = this.createElementNode('style', style, {
            id: name + "_style"
        });
    }

    // These 3 functions initial(), get(), save() are all for Session Storage


    _createClass(createWidget, [{
        key: 'initialData',
        value: function initialData() {
            if (sessionStorage.getItem('product') === null) {
                sessionStorage.setItem('product', JSON.stringify({
                    transformData: {}
                }));
            }
        }
    }, {
        key: 'getData',
        value: function getData() {
            return JSON.parse(sessionStorage.getItem('product'));
        }
    }, {
        key: 'saveData',
        value: function saveData(jsonData) {
            sessionStorage.setItem('product', JSON.stringify(jsonData));
        }
    }, {
        key: 'createElementNode',


        /**
         * @function createElementNode
         *
         * @param string type - the element tag that will be the product name
         * @param string innerHTML - html Dom converted into a string
         * @param object attributes - data attributes that are use to populate element tag
         **/
        value: function createElementNode(type, innerHTML, attributes) {
            // create Element for all
            var node = document.createElement(type);
            node.innerHTML = innerHTML;
            try {
                Object.keys(attributes).forEach(function (attr) {
                    node.setAttribute(attr, attributes[attr]);
                });
            } catch (e) {
                return node;
            }
            return node;
        }
    }, {
        key: 'insertStyle',


        /**
         * @function insertStyle
         *
         * @param object widgetEl - dom element style tag that will be inserted into element passed through
         **/
        value: function insertStyle(widgetEl) {
            if (!document.getElementById(this.name + "_style")) {
                widgetEl.appendChild(this.style);
            }
        }
    }, {
        key: 'insertWidget',


        /**
         * @function insertWidget
         *
         * @param object widgetEl - dom element HTML content that will be inserted into element passed through
         **/
        value: function insertWidget(widgetEl) {
            widgetEl.appendChild(this.widgetEl);
        }
    }, {
        key: 'truncateText',


        /**
         * @function truncateText
         * transformes a dom element to be truncated to fit the number of line clamps wanting
         *
         * @param object widgetEl - dom element HTML content that will be inserted into element passed through
         * @param number lineClamp - max number of lines that before getting truncated on the dom element
         * @param string widgetEl - dom element HTML content that will be inserted at the end of the truncated text
         **/
        value: function truncateText(widgetEl) {
            var lineClamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var endHtml = arguments[2];

            if (widgetEl && widgetEl.nodeType == 1) {
                var htmlEndEl;
                if (endHtml) {
                    htmlEndEl = this.createElementNode("span", endHtml);
                }
                this.lineClamp.default(widgetEl, {
                    lineCount: lineClamp,
                    endHtml: htmlEndEl
                });
            }
        }
    }, {
        key: 'setImage',


        /**
         * @function setImage
         *
         * @param string image - image string that will be returned
         * @param string fallbackImage - (optional) fallbackImage string that can be used if image is null
         **/
        value: function setImage(image, fallbackImage) {
            if (image != null && image != "null" && image != "") {
                return image;
            } else {
                return fallbackImage ? fallbackImage : this.fallbackImage;
            }
        }
    }, {
        key: 'setDefaultFallbackImage',


        /**
         * @function setDefaultFallbackImage
         *
         * @param string fallbackImage - sets default fallback image if no fallback is provided
         **/
        value: function setDefaultFallbackImage(fallbackImage) {
            this.fallbackImage = fallbackImage;
        }
    }]);

    return createWidget;
}();

module.exports = createWidget;
