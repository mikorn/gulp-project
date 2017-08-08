<p>Русская версия находится в файле README.ru.md.</p>
<h1>Gulp project example for website development</h1>
<h2>Description</h2>
<p>In this repository there is a template for website development with Gulp.</p>
<p>In the template to use Pug and Stylus preprocessors.</p>
<p>Detailed description in <a href="https://webmikorn.ru/articles/opyit-sborki-proekta-gulp/">article</a> (russian language).</p>
<h2>Requirements</h2>
<ol>
  <li>Node.js.</li>
  <li>Node.js Packet Manager (NPM).</li>
  <li>Gulp.</li>
  <li>Git.</li>
  <li>Git Bash &mdash; for Windows users.</li>
  <li>Bower.</li>
</ol>
<h2>Use the template</h2>
<p>1. Cloning of the project:</p>
<pre>git clone https://github.com/mikorn/gulp-project.git --depth 1 my-gulp-project</pre>
<p>Farther go to the folder:</p>
<pre>cd my-gulp-project</pre>
<p>2. Installing of npm-dependencies:</p>
<pre>npm install</pre>
<p>Or:</p>
<pre>npm i</pre>
<p>3. Installing of bower-dependencies:</p>
<pre>bower install</pre>
<p>or:</p>
<pre>bower i</pre>
<p>The template is ready for development.</p>
<h2>Development</h2>
<p>Project sctructure:</p>
<pre>
project/
|------/app/
|----------/assets/
|-----------------/css/
|---------------------/common.min.css
|---------------------/common.css
|---------------------/vendor.min.css
|-----------------/fonts/
|-----------------/images/
|-----------------/js/
|--------------------/common.min.js
|--------------------/common.js
|--------------------/vendor.min.js
|----------/blocks/
|-----------------/block-1/
|-------------------------/block-1.js
|-------------------------/block-1.styl
|-----------------/block-2/
|-------------------------/block-2.js
|-------------------------/block-2.styl
|-----------------/block-3/
|-------------------------/block-3.js
|-------------------------/block-3.styl
|----------/materials/
|----------/pug/
|--------------/blocks/
|---------------------/footer.pug
|---------------------/head.pug
|---------------------/header.pug
|---------------------/sidebar.pug
|--------------/layouts/
|----------------------/default.pug
|--------------/pages/
|--------------------/404.pug
|--------------------/about.pug
|--------------------/contacts.pug
|--------------------/index.pug
|--------------------/services.pug
|----------/config/
|-----------------/mixins.styl
|-----------------/variables.styl
|----------/vendor/
|-----------------/bootstrap/
|-----------------/font-awesome/
|-----------------/jquery/
|-----------------/normalize-css/
|----------/404.html
|----------/about.html
|----------/contacts.html
|----------/index.html
|----------/services.html
|------/.bowerrc
|------/.gitignore
|------/bower.json
|------/gulpfile.js
|------/package.json
|------/dist/
|-----------/assets/
|------------------/css/
|----------------------/common.min.css
|----------------------/vendor.min.css
|------------------/fonts/
|------------------/images/
|------------------/js/
|---------------------/common.min.js
|---------------------/vendor.min.js
|-----------/404.html
|-----------/about.html
|-----------/contacts.html
|-----------/index.html
|-----------/services.html
|------/node_modules/
</pre>
<p>Default installed jQuery, Normalize.css, Bootstrap, Font Awesome.</p>
<p>This list changed with Bower and further to make the appropriate changes in gulpfile.js. And reload Gulp.</p>
<p>For development need to run Gulp:</p>
<pre>gulp</pre>
<p>All development happens in folder app.</p>
<p>For creating of production folder need to run command:</p>
<pre>gulp public</p>
