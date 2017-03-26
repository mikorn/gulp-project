'use strict';

// Подключение плагинов:
var gulp = require('gulp'), // Gulp
    autoprefixer = require('gulp-autoprefixer'), // Добавление префиксов
    concat = require('gulp-concat'), // Конкатенация (объединение) файлов
    csso = require('gulp-csso'), // Минификация CSS-файлов
    del = require('del'), // Удаление, очистка папок
    imagemin = require('gulp-imagemin'), // Обработка изображений
    plumber = require('gulp-plumber'), // Обработка ошибок
    rename = require("gulp-rename"), // Переименование файлов
    sourcemaps = require('gulp-sourcemaps'), // Source maps
    stylus = require('gulp-stylus'), // Stylus
    pngquant = require('imagemin-pngquant'), // Обработка PNG-изображений
    pug = require('gulp-pug'), // Pug
    uglify = require('gulp-uglify'); // Минификация JS-файлов

// Подключение Browsersync:    
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// Переменные, задающие пути для тасков:
var paths = {
  dir: { // Директории
    dev: './app', // development-папка (директория для разработки)
    dist: './dist' // production-папка (директория для продакшн)
  },
  watch: { // Переменные, задающие пути для вотчера
    pug: './app/pug/**/*.pug', // Вотчер для Pug-файлов
    styl: './app/**/*.styl', // Вотчер для Stylus-файлов
    js: './app/**/*.js', // Вотчер для JS-файлов
    img: './app/assets/img/**/*.*' // Вотчер для изображений
  },
  app: {
    html: { // Переменные, задающие пути для таска html
      src: './app/pug/pages/*.pug', // Исходник для таска html
      dest: './app' // Место сохранения результатов работы таска html
    },
    css: { // Переменные, задающие пути для таска css
      src: './app/styl/styles.styl', // Исходник для таска css
      dest: './app/assets/css' // Место сохранения результатов работы таска css
    },
    js: { // Переменные, задающие пути для таска js
      src: './app/blocks/**/*.js', // Исходник для таска js
      dest: './app/assets/js' // Место сохранения результатов работы таска js
    },
  },
  vendor: {
    css: { // Переменные, задающие пути для таска cssVendor
      src: [ // Исходники для таска cssVendor
        './app/vendor/normalize-css/normalize.css', // Файл стилей Normalize.css
        './app/vendor/bootstrap/dist/css/bootstrap.min.css', // Файл стилей Bootstrap
        './app/vendor/font-awesome/css/font-awesome.min.css' // Файл стилей Font Awesome
      ],
      dest: './app/assets/css' // Место сохранения результатов работы таска cssVendor
    },
    js: { // Переменные, задающие пути для таска jsVendor
      src: [ // Исходники для таска jsVendor
        './app/vendor/jquery/dist/jquery.min.js', // JS-файл jQuery
        './app/vendor/bootstrap/dist/js/bootstrap.min.js' // JS-файл Bootstrap
      ],
      dest: './app/assets/js' // Место сохранения результатов работы таска jsVendor
    },
    fonts: { // Переменные, задающие пути для таска fontsVendor
      src: [ // Исходник для таска fontsVendor
        './app/vendor/bootstrap/dist/fonts/*.*', // Все файлы в папке fonts Bootstrap
        './app/vendor/font-awesome/fonts/*.*' // Все файлы в папке fonts Font Awesome
      ],
      dest: './app/assets/fonts' // Место сохранения результатов работы таска fontsVendor
    }
  },
  img: { // Переменные, задающие пути для таска img
    src: './app/assets/img/**/*.*', // Исходник для таска img
    dest: './dist/assets/img' // Место сохранения результатов работы таска img
  },
  dist: { // Переменные, задающие пути для таска dist
    html: { // HTML-файлы
      src: './app/*.html',
      dest: './dist'
    },
    css: { // CSS-файлы
      src: './app/assets/css/*.css',
      dest: './dist/assets/css'
    },
    js: { // JS-файлы
      src: './app/assets/js/*.js',
      dest: './dist/assets/js'
    },
    fonts: { // Файлы из папки fonts
      src: './app/assets/fonts/*.*',
      dest: './dist/assets/fonts'
    }
  }
}

// Browsersync (автообновление браузера):
gulp.task('serve', function() {
  browserSync.init({
    server: paths.dir.dev,
    browser: 'firefox'
  });
  gulp.watch(paths.watch.pug, gulp.series('html')); // Вотчер Pug
  gulp.watch(paths.watch.styl, gulp.series('css')); // Вотчер Stylus
  gulp.watch(paths.watch.js, gulp.series('js')); // Вотчер JS
  gulp.watch(paths.watch.img, gulp.series('img')); // Вотчер для изображений
  gulp.watch('*.html').on('change', reload); // Перезагрузка браузера в случае изменений
});

// Таск для работы Pug (преобразование Pug в HTML):
gulp.task('html', function () {
  return gulp.src(paths.app.html.src) // Исходник таска pug (все Pug-файлы в папке src/pug/pages)
    .pipe(plumber()) // Обработка ошибок при работе таска pug
    .pipe(pug({pretty: true})) // Преобразование Pug в HTML
    .pipe(gulp.dest(paths.app.html.dest)) // Сохранение HTML-файлов в папке src
    .pipe(browserSync.stream()); // Browsersync
});

// Таск для работы Stylus (преобразование и минификация Stylus в CSS):
gulp.task('css', function () {
  return gulp.src(paths.app.css.src) // Файл styles.styl
    .pipe(plumber()) // Обработка ошибок при работе таска stylus
    .pipe(sourcemaps.init()) // Инициализация Source maps
    .pipe(stylus()) // Преобразование styles.styl в styles.css
    .pipe(autoprefixer()) // Добавление префиксов
    .pipe(rename({suffix: '.min'})) // Переименование styles.css в styles.min.css
    .pipe(csso()) // Минификация файла styles.min.css
    .pipe(gulp.dest(paths.app.css.dest)) // Сохранение минифицированного файла styles.min.css в папку src/assets/css
    .pipe(sourcemaps.write()) // Написание исходных файлов
    .pipe(browserSync.stream()); // Browsersync
});

// Таск для объединения и минификации JS-файлов:
gulp.task('js', function() {
  return gulp.src(paths.app.js.src)
    .pipe(plumber()) // Обработка ошибок при работе таска js
    .pipe(sourcemaps.init()) // Инициализация Source maps
    .pipe(concat('scripts.min.js')) // Объединение JS-файлов
    .pipe(uglify()) // Минификация файла scripts.min.js
    .pipe(gulp.dest(paths.app.js.dest)) // Сохранение минифицированного файла scripts.min.js
    .pipe(sourcemaps.write()) // Написание исходных файлов
    .pipe(browserSync.stream()); // Browsersync
});

// Таск по конкатенации и минификации CSS-файлов внешних приложений и плагинов:
gulp.task('cssVendor', function () {
  return gulp.src(paths.vendor.css.src) // CSS-файлы внешних приложений и плагинов
    .pipe(concat('vendor.min.css')) // Конкатенация (объединение) CSS-файлов в один файл vendor.min.css
    .pipe(csso()) // Минификация файла vendor.min.css
    .pipe(gulp.dest(paths.vendor.css.dest)); // Сохранение минифицированного файла vendor.min.css в папку src/assets/css
});

// Таск по конкатенации и минификации JS-файлов внешних приложений и плагинов:
gulp.task('jsVendor', function () {
  return gulp.src(paths.vendor.js.src) // JS-файлы внешних приложений и плагинов
    .pipe(concat('vendor.min.js')) // Конкатенация (объединение) JS-файлов в один файл vendor.min.js
    .pipe(uglify()) // Минификация файла vendor.min.js
    .pipe(gulp.dest(paths.vendor.js.dest)); // Сохранение минифицированного файла vendor.min.js в папку src/assets/js
});

// Таск по переносу содержимого папок fonts внешних приложений и плагинов
gulp.task('fontsVendor', function () {
  return gulp.src(paths.vendor.fonts.src) // Сбор содержимого папок fonts внешних приложений и плагинов
    .pipe(gulp.dest(paths.vendor.fonts.dest)); // Сохранение в папку src/assets/fonts
});

gulp.task('build', gulp.parallel('html', 'css', 'js', 'cssVendor', 'jsVendor', 'fontsVendor'));

// Таск предварительной очистки (удаления) production-папки dist:
gulp.task('clean', function() {
  return del(paths.app); // удаление distribution-папки
});

// Обработка изображений и перенос их из development-папки в production:
gulp.task('img', function() {
  return gulp.src(paths.img.src)
    .pipe(imagemin({use: [pngquant()]}))
    .pipe(gulp.dest(paths.img.dest));
});

// Формирование папки для production:
gulp.task('dist', gulp.series('clean', 'img'), function () {
  var htmlDist = gulp.src(paths.dist.html.src)
      .pipe(gulp.dest(paths.dist.html.dest)); // Перенос HTML-файлов
  var cssDist = gulp.src(paths.dist.css.src)
      .pipe(gulp.dest(paths.dist.css.dest)); // Перенос CSS-файлов
  var jsDist = gulp.src(paths.dist.js.src)
      .pipe(gulp.dest(paths.dist.js.dest)); // Перенос JS-файлов
  var fontsDist = gulp.src(paths.dist.fonts.src)
      .pipe(gulp.dest(paths.dist.fonts.dest)); // Перенос fonts
  return htmlDist, cssDist, jsDist, fontsDist;
});

// Запуск сборки:
gulp.task('default', gulp.series('build', 'serve'));
