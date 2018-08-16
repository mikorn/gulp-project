<p>Русская версия находится в файле README.ru.md.</p>
<h1>Gulp project example for website development</h1>
<h2>Description</h2>
<p>In this repository there is a template for website development with Gulp.</p>
<p>In the template to use Pug and Stylus preprocessors.</p>
<p>Detailed description in <a href="https://webmikorn.ru/articles/opyit-sborki-proekta-gulp/">article</a> (russian language).</p>
<h2>Requirements</h2>
<ol>
  <li>Node.js.</li>
  <li>Node.js Package Manager (NPM).</li>
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
<p>Default installed jQuery, Bootstrap, Font Awesome, Animate.css, Wow, Parallax.js and PageScroll2ID.</p>
<p>This list changed with Bower and further to make the appropriate changes in gulpfile.js. And reload Gulp.</p>
<p>For development need to run Gulp:</p>
<pre>gulp</pre>
<p>All development happens in folder app.</p>
<p>For creating of production folder need to run command:</p>
<pre>gulp public</p>
