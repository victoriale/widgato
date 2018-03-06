// Version 0.1.0 globals https://github.com/passit/SNT-Widgets

/**
 * @function constructor
 *
 * @param string name - the element tag that will be the product name
 * @param string html - html Dom converted into a string
 * @param string style - css style converted into a string
 **/
var createWidget = class createWidget {
    constructor(name, html, style) {
        this.lineClamp = require('./line_clamp.js');
        this.fallbackImage = null;
        this.initialData();
        this.name = name;
        this.widgetEl = this.createElementNode(name, html, {
            style: "display:block"
        });
        this.style = this.createElementNode('style', style, {
            id: name + "_style"
        })
    }

    // These 3 functions initial(), get(), save() are all for Session Storage
    initialData() {
        if (sessionStorage.getItem('product') === null) {
            sessionStorage.setItem('product', JSON.stringify({
                transformData: {}
            }));
        }
    };

    getData() {
        return JSON.parse(sessionStorage.getItem('product'));
    };

    saveData(jsonData) {
        sessionStorage.setItem('product', JSON.stringify(jsonData));
    };

    /**
     * @function createElementNode
     *
     * @param string type - the element tag that will be the product name
     * @param string innerHTML - html Dom converted into a string
     * @param object attributes - data attributes that are use to populate element tag
     **/
    createElementNode(type, innerHTML, attributes) {
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
    };

    /**
     * @function insertStyle
     *
     * @param object widgetEl - dom element style tag that will be inserted into element passed through
     **/
    insertStyle(widgetEl) {
        if (!document.getElementById(this.name + "_style")) {
            widgetEl.appendChild(this.style);
        }
    };

    /**
     * @function insertWidget
     *
     * @param object widgetEl - dom element HTML content that will be inserted into element passed through
     **/
    insertWidget(widgetEl) {
        widgetEl.appendChild(this.widgetEl);
    };

    /**
     * @function truncateText
     * transformes a dom element to be truncated to fit the number of line clamps wanting
     *
     * @param object widgetEl - dom element HTML content that will be inserted into element passed through
     * @param number lineClamp - max number of lines that before getting truncated on the dom element
     * @param string widgetEl - dom element HTML content that will be inserted at the end of the truncated text
     **/
    truncateText(widgetEl, lineClamp = 1, endHtml) {
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
    };

    /**
     * @function setImage
     *
     * @param string image - image string that will be returned
     * @param string fallbackImage - (optional) fallbackImage string that can be used if image is null
     **/
    setImage(image, fallbackImage) {
        if (image != null && image != "null" && image != "") {
            return image;
        } else {
            return fallbackImage ? fallbackImage : this.fallbackImage;
        }
    };

    /**
     * @function setDefaultFallbackImage
     *
     * @param string fallbackImage - sets default fallback image if no fallback is provided
     **/
    setDefaultFallbackImage(fallbackImage) {
        this.fallbackImage = fallbackImage;
    };
};

module.exports = createWidget;
