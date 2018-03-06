# KBB Widgets
Development of KBB Products (trending, dashboard, and widget) that will auto compile using [Gulp](https://gulpjs.com/) , [Webpack](https://webpack.js.org/), [Babel](http://babeljs.io/),based off of [NodeJS](https://nodejs.org/en/).

### Installation
1. pull repository into local directory
  - `git clone https://github.com/passit/SNT-Widgets`
2. cd /path/to/repo
3. `npm i`

## Development
1. cd /path/to/repo
2. run `gulp watch`
  - to allow developer to constantly watch over the declared files in gulpfile.js

## Dashboard && Trending Widget
Dashboard product is a content widget that shows the most recent article and carousel of related products based off of:
`category` (automotive)
`publisher` (kbb.com)
`article_type` (currently known article types)
  - Latest
  - Expert Review
  - Videos
  - Top-List

This product gets its information from the Search API found in [Article Search library](https://github.com/passit/Article-Search#search-api)

## Widget (300x600)
The Standard 300x600 widget product is a carousel content widget that shows the most related products based off of the content found on its current URL address

The URL address will return information based off of keywords algorithm using the Webharvester API found in [Web Harvester](https://github.com/passit/Web-Harvester)
