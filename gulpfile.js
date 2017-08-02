'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var paths = {
  dir: {
    app: './app',
    dist: './dist'
  },
  watch: {
    html: './app/pug/**/*.pug',
    css: [
      './app/blocks/**/*.styl',
      './app/config/**/*.styl'
    ],
    js: './app/blocks/**/*.js'
  },
  app: {
    html: {
      src: './app/pug/pages/*.pug',
      dest: './app'
    },
    common: {
      css: {
        src: [
          './app/config/variables.styl',
          './app/config/mixins.styl',
          './app/blocks/**/*.styl'
        ],
        dest: './app/assets/css'
      },
      js: {
        src: './app/blocks/**/*.js',
        dest: './app/assets/js'
      }
    },
    vendor: {
      css: {
        src: [
          './app/vendor/normalize-css/normalize.css',
          './app/vendor/bootstrap/dist/css/bootstrap.min.css',
          './app/vendor/font-awesome/css/font-awesome.min.css'
        ],
        dest: './app/assets/css'
      },
      js: {
        src: [
          './app/vendor/jquery/dist/jquery.min.js',
          './app/vendor/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: './app/assets/js'
      },
      fonts: {
        src: [
          './app/vendor/font-awesome/fonts/*.*'
        ],
        dest: './app/assets/fonts'
      }
    }
  },
  img: {
    src: './app/assets/images/**/*.*',
    dest: './dist/assets/images'
  },
  dist: {
    html: {
      src: './app/*.html',
      dest: './dist'
    },
    css: {
      src: './app/assets/css/*.min.css',
      dest: './dist/assets/css'
    },
    js: {
      src: './app/assets/js/*.min.js',
      dest: './dist/assets/js'
    },
    fonts: {
      src: './app/assets/fonts/*.*',
      dest: './dist/assets/fonts'
    }
  }
}

gulp.task('serve', function() {
  browserSync.init({
    server: './app',
    browser: 'firefox'
  });
  gulp.watch(paths.watch.html, gulp.series('html'));
  gulp.watch(paths.watch.css, gulp.series('cssCommon'));
  gulp.watch(paths.watch.js, gulp.series('jsCommon'));
  gulp.watch('*.html').on('change', reload);
});

gulp.task('html', function () {
  return gulp.src(paths.app.html.src)
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.app.html.dest))
    .pipe(browserSync.stream());
});

gulp.task('cssCommon', function() {
  return gulp.src(paths.app.common.css.src)
    .pipe(plumber())
    .pipe(concat('common.styl'))
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.app.common.css.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(gulp.dest(paths.app.common.css.dest))
    .pipe(browserSync.stream());
});

gulp.task('jsCommon', function() {
  return gulp.src(paths.app.common.js.src)
    .pipe(plumber())
    .pipe(concat('common.js'))
    .pipe(gulp.dest(paths.app.common.js.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.app.common.js.dest))
    .pipe(browserSync.stream());
});

gulp.task('cssVendor', function () {
  return gulp.src(paths.app.vendor.css.src)
    .pipe(concat('vendor.min.css'))
    .pipe(csso())
    .pipe(gulp.dest(paths.app.vendor.css.dest));
});

gulp.task('jsVendor', function () {
  return gulp.src(paths.app.vendor.js.src)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.app.vendor.js.dest));
});

gulp.task('fontsVendor', function () {
  return gulp.src(paths.app.vendor.fonts.src)
    .pipe(gulp.dest(paths.app.vendor.fonts.dest));
});

gulp.task('clean', function() {
  return del(paths.dir.dist);
});

gulp.task('img', function() {
  return gulp.src(paths.img.src)
    .pipe(imagemin({use: [pngquant()]}))
    .pipe(gulp.dest(paths.img.dest));
});

gulp.task('dist', function () {
  var htmlDist = gulp.src(paths.dist.html.src)
      .pipe(gulp.dest(paths.dist.html.dest));
  var cssDist = gulp.src(paths.dist.css.src)
      .pipe(gulp.dest(paths.dist.css.dest));
  var jsDist = gulp.src(paths.dist.js.src)
      .pipe(gulp.dest(paths.dist.js.dest));
  var fontsDist = gulp.src(paths.dist.fonts.src)
      .pipe(gulp.dest(paths.dist.fonts.dest));
  return htmlDist, cssDist, jsDist, fontsDist;
});

gulp.task('build', gulp.parallel('html', 'cssCommon', 'jsCommon', 'cssVendor', 'jsVendor', 'fontsVendor'));

gulp.task('default', gulp.series('build', 'serve'));

gulp.task('public', gulp.series('clean', 'img', 'dist'));
