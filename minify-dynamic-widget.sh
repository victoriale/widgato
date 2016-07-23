#!/bin/bash
# Minify the CSS
for i in $(ls css | grep dynamic_widget_); do
	read -p "Minify $i (y/n)? " -r do_minify
	if [[ $do_minify =~ ^[Yy]$ ]]; then
		minify --no-comments --output css/$i css/$i
	fi
done
read -p "Minify chatterbox.css (y/n)? " -r do_minify
if [[ $do_minify =~ ^[Yy]$ ]]; then
	minify --no-comments --output chatterbox/chatterbox.css chatterbox/chatterbox.css
fi

# Minify the JS
read -p "Minify dynamic_widget.js (y/n)? " -r do_minify
if [[ $do_minify =~ ^[Yy]$ ]]; then
	uglifyjs js/dynamic_widget.js -m -q 1 --output js/dynamic_widget.js
fi
read -p "Minify chatterbox.unminified.js (y/n)? " -r do_minify
if [[ $do_minify =~ ^[Yy]$ ]]; then
	uglifyjs chatterbox/chatterbox.unminified.js -m -q 1 --output chatterbox/chatterbox.js
fi

# Minify the dynamic_widget.html
read -p "Minify dynamic_widget.html (y/n)? " -r do_minify
if [[ $do_minify =~ ^[Yy]$ ]]; then
	html-minifier --remove-comments -o dynamic_widget/dynamic_widget.html --collapse-whitespace --conservative-collapse --remove-attribute-quotes --remove-empty-attributes --remove-ignored --minify-js dynamic_widget/dynamic_widget.html
fi
read -p "Minify dynamic_widget_250.html (y/n)? " -r do_minify
if [[ $do_minify =~ ^[Yy]$ ]]; then
	html-minifier --remove-comments -o dynamic_widget/dynamic_widget_250.html --collapse-whitespace --conservative-collapse --remove-attribute-quotes --remove-empty-attributes --remove-ignored --minify-js dynamic_widget/dynamic_widget_250.html
fi
read -p "Minify dynamic_widget_970.html (y/n)? " -r do_minify
if [[ $do_minify =~ ^[Yy]$ ]]; then
	html-minifier --remove-comments -o dynamic_widget/dynamic_widget_970.html --collapse-whitespace --conservative-collapse --remove-attribute-quotes --remove-empty-attributes --remove-ignored --minify-js dynamic_widget/dynamic_widget_970.html
fi
