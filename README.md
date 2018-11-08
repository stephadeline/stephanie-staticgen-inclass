# ICJ Project Template

A Node-based template system with a Gulp workflow set up for Github Pages publishing.

Features:

- [Bootstrap 4.1](https://getbootstrap.com/).
- [Sass](https://sass-lang.com/) with [autoprefixer](https://github.com/postcss/autoprefixer).
- Nunjucks templates with [`journalize`](https://www.npmjs.com/package/journalize) filters. Data and be made available to templates through the `project.config.json` file.
- Browsersync server.
- Image compression. (Not sure if this is working).
- Publishing to `docs/` for [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch).

## Setup

If you are in my ICJ class, this is already done, but others will need to make sure you have gulp installed globally: `npm install -g gulp-cli`.

Download this directory, then `cd` into the project directory.

```sh
npm install
gulp dev
```

## Using this project

Most of the files you edit for this project are in the `src` directory. The Gulp production process will generate the publishable files into the `docs` folder, which you shouldn't have to touch.

```pre
src
|-- assets
|   |-- img (Images go in here)
|-- js
|-- njk
|   |-- _data
|      |-- data.json (Any data to be parsed by Nunjucks)
|   |-- _layouts (Templates to be used by your pages)
|   |-- _partials (Reusable code for Templates)
|   |-- index.html (Pages that become your site)
|-- scss
|   |-- main.scss (Sass files and partials)
|   |-- _partials.scss
```

### Nunjucks templates

This project is configured to use Bootstrap 4 HTML/Sass as its core.

[Nunjucks](https://mozilla.github.io/nunjucks/templating.html) allows you to break your HTML into templates for the main structure of your site so you don't have to repeat that code for each page on your site.

Templates work off several basic concepts:

- Template inheritance using _extends_.
- _blocks_ which serve as variables or replaceable code.
- _include_ which pulls in code from other files.

With these tools, you can build a site framework once as a Layout, and then _extend_ or "use" that layout and all it's code, but swap out predefined _blocks_ specific to your new page.

#### Layouts

**Layouts** and **partials** are parts of files used and extended elsewhere.

- The layout `src/njk/_layouts/base.njk` is an example base template for a site. The idea is to build the framework of the site only once, even though you have many pages.
- The layout `src/njk/_layouts/detail.njk` is an example of a layout that _extends_ the base layout, but then allows the user to insert different content through the _content_ block.
- Anything in `src/njk/_partials/` are snippets of code used by other layouts through a Nunjucks tag called _include_.

The Nunjucks community has adopted `.njk` as the file extension for templates. These files are only used for processing, and do NOT become actual webpages on your site.

#### Pages

All **pages** are kept in the root of the `njk` folder. Each HTML file created here becomes a page on your website.

- The page `src/njk/index.html` is the main website page that _extends_ base.njk. You are coding only the main content of the page, and inheriting all the nav and other framework.
- The page `src/njk/detail-page.html` _extends_ the "detail.html" layout, which is already extending "base.html". It allows you to have a different structure than the index file, yet still reuse it for many other pages.

We are using the `.html` file extension here because these WILL become actual pages on your website.

#### Using data in Nunjucks templates

Nunjucks has special [tags to apply logic](https://mozilla.github.io/nunjucks/templating.html#tags), like looping through data within templates. There should be an example of this in the `index.html` page.

Most data should be saved as key-value pairs or as an array in the `src/njk/_data/data.json`. (There are examples in that file as well as below.)

You can also set global variables in `project.config.json` as key-value pairs or arrays.

> IMPORTANT: If you add/change/delete data in either file, you must re-run the `gulp dev` command to make it available to Nunjucks.

Have a spreadsheet of data that you need to convert to JSON? Try [csvjson.com](https://www.csvjson.com/csv2json).

```json
  "publish_date": "Feb. 5, 2017",
  "books": [
    {
      "title": "The Clown",
      "author": "Heinrich Böll"
    },
    {
      "title": "The Shipping News",
      "author": "Annie Proulx"
    }
  ]
}
```

### Sass/scss

The `src/scss/` folder holds all the SCSS files. It is configured for Bootstrap and gets compiled into the `docs` folder for publication.

There is also and example of a Sass partial with the `src/scss/_nav.scss` file, which is imported into `src/scss/main.scss`.

### Deployment

This project is designed to bundle the finished website into the `docs` folder, which can then be published anywhere you have a server.

By default, the `docs/` folder is committed to Github because we are using [Github Pages](https://help.github.com/categories/github-pages-basics/) for free hosting of our site.

Review [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) for specific directions on deployment there.

## Technical bits on how this project is structured

### Gulp

Gulp is task runner and is configured in `gulpfile.babel.js`. Individual tasks live in `tasks`.

- Default task -- just `gulp` -- runs `styles`, `lint`, `scripts`, `images` and `nunjucks` to create the production files.
- Running `gulp dev` runs the default tasks above plus `serve` for the BrowserSync server.
- To run any specific gulp task: `gulp <name of task>`, e.g. `gulp clean`.

#### Tasks

- `clean.js`: Clear out the `docs` directory using [`del`](https://www.npmjs.com/package/del).
- `images.js`: Optimize images using [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin).
- `lint.js`: Lint your (optionally ES6) javascript in `/src/js/` using [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) -- it's a good idea to have an eslint package installed in your text editor of choice, as well.
- `nunjucks.js`: Build out templates using [`gulp-nunjucks-render`](https://github.com/carlosl/gulp-nunjucks-render) (see notes below).
- `scripts.js`: Babel/concat/uglify javascript in `/src/js/` using [`gulp-babel`](https://www.npmjs.com/package/gulp-babel), [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) and [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify).
- `serve.js`: Spin up a [BrowserSync](https://browsersync.io/docs/gulp) server at `localhost:3000`. Bundled with watch tasks for css/js/template changes.
- `styles.js`: Process Sass files from `/src/scss/` into minified css using [`gulp-sass`](https://www.npmjs.com/package/gulp-sass), [`gulp-sourcemaps`](https://www.npmjs.com/package/gulp-sourcemaps), [`gulp-autoprefixer`](https://www.npmjs.com/package/gulp-autoprefixer) and [`gulp-cssnano`](https://www.npmjs.com/package/gulp-cssnano).

### More on Nunjucks

You can add [custom filters](https://mozilla.github.io/nunjucks/api.html#custom-filters) and [global variables](https://mozilla.github.io/nunjucks/api.html#addglobal) in the `manageEnv` function inside `tasks/nunjucks.js`.

A collection of functions useful for making prose reader friendly is already included with [`journalize`](https://www.npmjs.com/package/journalize).

### Issues

There are known issues with this template:

- There are warnings about outdated npm packages. The fix requires an upgrade of `babel-core`, which is a breaking fix.

### Future development

- Might add a Nunjucks Markdown package of some sort to allow adding/editing of basic text in Markdown, and maybe perhaps front-matter.
