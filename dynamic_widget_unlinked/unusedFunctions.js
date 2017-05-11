
    /* SNT DEFINED CLASSES TO BE FOUND AND USED FOR
     * function classInheritorReplace(identifier, category)
     */
    // classInheritorReplace("color_inheritor", category);
    // classInheritorReplace("background_inheritor", category);
    // classInheritorReplace("button_inheritor", category);

    /********************** SETUP CATEGORY COLORS **********************
     * @function classInheritorReplace
     * dynamically set the colors of the css Rules each identifier in the html for dynamic colors
     *
     * @param function
     *      identifier - unique identifier in the html used to run a function that replaces the color scheme based on category
     *      category - sets the base category for colors that are stored in the global ./css/inheritor/inheritor.css
     */
    function classInheritorReplace(identifier, category) {
        var htmlClass = document.getElementById(identifier);
        var re = new RegExp('inheritor', "g");
        var categoryClass = category == 'default' ? '' : category + '-'; // ex default returns nothing , football-, baseball-
        var classes = htmlClass.className.split(" ").filter(function(c) {
            return c.match(re) != null ? c.match(re) : null;
        });
        switch (identifier) {
            case "color_inheritor":
                htmlClass.classList.remove(classes[0]);
                htmlClass.classList.add(categoryClass + "inheritor");
                break;
            case "background_inheritor":
                htmlClass.classList.remove(classes[0]);
                htmlClass.classList.add(categoryClass + "inheritor_img_bg");
                break;
            case "button_inheritor":
                for (var i = 0; i < classes.length; i++) {
                    htmlClass.classList.remove(classes[i]);
                }
                htmlClass.classList.add(categoryClass + "inheritor_border");
                htmlClass.classList.add(categoryClass + "inheritor_bg");
                break;
        }
    }


    /**************************************************************DEPRECATED*****************************************************/
    // color = categoryColors[category];
    // /************************* CSS CLASS LOOPING *********************
    //  * @function classLoop
    //  * Loops throught stylesheet and finds cssName and change the cssRules
    //  *
    //  * @param function
    //  *     cssName - name of css class to change its cssRule
    //  *     style - the style with specific cases currently available styles => color, border-color, background-color
    //  *     styleColor - uses color based on the categoryColors and category
    //  */
    function classLoop(cssName, style, styleColor) {
        var styleSheets = getCssSelector("5embed");

        //delete inheritor rule and RE-APPLY css with new rule (easier when only one cssrule is needed to change)
        if (styleSheets) {
            var attribute = findCss(cssName, styleSheets);
            styleSheets.deleteRule(attribute.index);
            //try catch statements are for ie compatibility
            switch (style) {
                case 'color':
                    try {
                        styleSheets.insertRule('.' + cssName + ' { color: ' + styleColor + ' !important; }', 0);
                    } catch (e) {
                        styleSheets.addRule('.' + cssName, 'color: ' + styleColor + ' !important', 0);
                    }
                    break;
                case 'border-color':
                    try {
                        styleSheets.insertRule('.' + cssName + ' { border-color: ' + styleColor + ' !important; }', 0);
                    } catch (e) {
                        styleSheets.addRule('.' + cssName, 'border-color: ' + styleColor + ' !important', 0);
                    }
                    break;
                case 'background-color':
                    try {
                        styleSheets.insertRule('.' + cssName + ' { background-color: ' + styleColor + ' !important; }', 0);
                    } catch (e) {
                        styleSheets.addRule('.' + cssName, 'background-color: ' + styleColor + ' !important', 0);
                    }
                    break;
                default:
                    break;
            }
        }

    }

    /*********************** GET CSS SELECTOR **********************
     * @function getCssSelector
     * find the css File with the title given to the function
     *
     * @param function title - send in the title to choose which selector
     */
    function getCssSelector(title) {
        var selector = document.styleSheets;
        for (var index = 0; index < selector.length; index++) {
            if (selector[index].title == title) {
                return selector[index];
            }
        }
    }

    /********************* FIND CSS NAME ******************
     * @function findCss
     * find the the specific css element by the given selector Text (ex: .inheritor , body, html, #profile-name)
     *
     * @param function
     *     cssName - cssName of the rule we want to find
     *     styleSheets - the chosen style seet that we need to change the cssName for
     */
    function findCss(cssName, styleSheets) {
        if (styleSheets.cssRules != null) {
            for (var index = 0; index < styleSheets.cssRules.length; index++) {
                if (styleSheets.cssRules[index].selectorText == "." + cssName) {
                    styleSheets.cssRules[index].index = index;
                    return styleSheets.cssRules[index];
                }
            }
        }
    }

    //Class Loop will change the color by looping through cssSelector File and changing the given class
    classLoop('inheritor', 'color', color);
    classLoop('inheritor_border', 'border-color', color);
    classLoop('inheritor_img_bg', 'background-color', color);
    classLoop('inheritor_bg:hover::before', 'background-color', color);
    /**************************************************************DEPRECATED*****************************************************/
