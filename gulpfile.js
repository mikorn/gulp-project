'use strict';

// Подключение плагинов:
var gulp = require('gulp'), // Gulp
    concat = require('gulp-concat'), // Конкатенация (объединение) файлов
    csso = require('gulp-csso'), // Минификация CSS-файлов
    del = require('del'), // Удаление, очистка папок
    imagemin = require('gulp-imagemin'), // Обработка изображений
    notify = require("gulp-notify"), // Вывод надписей при ошибках
    plumber = require('gulp-plumber'), // Обработка ошибок
    sourcemaps = require('gulp-sourcemaps'), // Source maps
    stylus = require('gulp-stylus'), // Stylus
    rename = require('gulp-rename'), // Переименование файлов
    pngquant = require('imagemin-pngquant'), // Обработка PNG-изображений
    pug = require('gulp-pug'), // Pug
    uglify = require('gulp-uglify'); // Минификация JS-файлов
    
// Подключение Browsersync:    
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// Пути для development-папки:
var devDir = './src', // development-папка
    htmlSrc = devDir + '/*.html', // HTML-шаблоны в development-папке
    pugDevSrc = devDir + '/pug/pages/*.pug', // Исходник для таска pug
    pugDevDest = devDir, // Место сохранения результатов работы таска pug
    stylDevSrc = devDir + '/styl/styles/*.styl', // Исходник для таска stylus
    stylDevDest = devDir + '/assets/css', // Место сохранения результатов работы таска stylus
    jsDevSrc = devDir + '/js/*.js', // Исходник для таска js
    jsDevDest = devDir + '/assets/js', // Место сохранения результатов работы таска js
    cssVendorSrc = [ // Исходник для таска cssVendor
        devDir + '/vendor/normalize-css/normalize.css', // Файл стилей Normalize.css
        devDir + '/vendor/bootstrap/dist/css/bootstrap.min.css', // Файл стилей Bootstrap
        devDir + '/vendor/font-awesome/css/font-awesome.min.css' // Файл стилей Font Awesome
    ],
    cssVendorDest = devDir + '/assets/css', // Место сохранения результатов работы таска cssVendor
    jsVendorSrc = [ // Исходник для таска jsVendor
        devDir + '/vendor/jquery/dist/jquery.min.js', // JS-файл jQuery
        devDir + '/vendor/bootstrap/dist/js/bootstrap.min.js' // JS-файл Bootstrap
    ],
    jsVendorDest = devDir + '/assets/js', // Место сохранения результатов работы таска jsVendor
    fontsVendorSrc = [ // Исходник для таска fontsVendor
        devDir + '/vendor/bootstrap/dist/fonts/*.*', // Все файлы в папке fonts Bootstrap
        devDir + '/vendor/font-awesome/fonts/*.*' // Все файлы в папке fonts Bootstrap
    ],
    fontsVendorDest = devDir + '/assets/fonts'; // Место сохранения результатов работы таска fontsVendor

// Пути для distribution-папки:
var distDir = './dist', // distribution-папка
    cssDistSrc = [
        devDir + '/assets/css/styles.min.css',
        devDir + '/assets/css/vendor.min.css'
    ],
    cssDistDest = distDir + '/assets/css', // Место сохранения CSS-файлов
    jsDistSrc = [
        devDir + '/assets/js/scripts.min.js',
        devDir + '/assets/js/vendor.min.js'
    ],
    jsDistDest = distDir + '/assets/js', // Место сохранения JS-файлов
    imgSrc = devDir + '/assets/img/**/*.*', // Исходник для таска img
    imgDest = distDir + '/assets/img', // Место сохранения результатов работы таска img
    fontsDistSrc = devDir + '/assets/fonts/**/*.*', // Все файлы в папке fonts для development
    fontsDistDest = distDir + '/assets/fonts'; // Папка fonts для distribution

// Пути для вотчера:
var pugWatch = devDir + '/pug/**/*.pug',
    stylWatch = devDir + '/styl/**/*.styl',
    jsWatch = devDir + '/js/**/*.js';

// Browsersync (автообновление браузера):
gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: devDir,
        browser: 'firefox'
    });
    gulp.watch(pugWatch, ['pug']);
    gulp.watch(stylWatch, ['stylus']);
    gulp.watch(jsWatch, ['js']);
    gulp.watch('*.html').on('change', reload);
});

// Таск для работы Pug (преобразование Pug в HTML):
gulp.task('pug', function () {
    return gulp.src(pugDevSrc) // Исходник таска pug (все Pug-файлы в папке src/pug/pages)
        .pipe(plumber()) // Обработка ошибок при работе таска pug
        .pipe(pug({pretty: true})) // Преобразование Pug в HTML
        .pipe(gulp.dest(pugDevDest)) // Сохранение HTML-файлов в папке src
        .pipe(browserSync.stream()); // Browsersync
});

// Таск для работы Stylus (преобразование и минификация Stylus в CSS):
gulp.task('stylus', function () {
    return gulp.src(stylDevSrc) // Файл styles.styl
        .pipe(plumber()) // Обработка ошибок при работе таска stylus
        .pipe(sourcemaps.init()) // Инициализация Source maps
        .pipe(stylus()) // Преобразование styles.styl в styles.css
        .pipe(gulp.dest(stylDevDest)) // Сохранение файла styles.css
        .pipe(rename({suffix: '.min'})) // Переименование styles.css в styles.min.css
        .pipe(csso()) // Минификация файла styles.min.css
        .pipe(sourcemaps.write()) // Написание исходных файлов
        .pipe(gulp.dest(stylDevDest)) // Сохранение минифицированного файла styles.min.css в папку src/assets/css
        .pipe(browserSync.stream()); // Browsersync
});

// Таск для объединения и минификации JS-файлов:
gulp.task('js', function() {
    return gulp.src(jsDevSrc)
        .pipe(plumber()) // Обработка ошибок при работе таска js
        .pipe(sourcemaps.init()) // Инициализация Source maps
        .pipe(concat('scripts.min.js')) // Объединение JS-файлов
        .pipe(uglify()) // Минификация файла scripts.min.js
        .pipe(gulp.dest(jsDevDest)) // Сохранение минифицированного файла scripts.min.js
        .pipe(sourcemaps.write()) // Написание исходных файлов
        .pipe(browserSync.stream()); // Browsersync
});

// Таск по конкатенации и минификации CSS-файлов внешних приложений и плагинов:
gulp.task('cssVendor', function () {
    return gulp.src(cssVendorSrc) // CSS-файлы внешних приложений и плагинов
        .pipe(concat('vendor.min.css')) // Конкатенация (объединение) CSS-файлов в один файл vendor.min.css
        .pipe(csso()) // Минификация файла vendor.min.css
        .pipe(gulp.dest(cssVendorDest)); // Сохранение минифицированного файла vendor.min.css в папку src/assets/css
});

// Таск по конкатенации и минификации JS-файлов внешних приложений и плагинов:
gulp.task('jsVendor', function () {
    return gulp.src(jsVendorSrc) // JS-файлы внешних приложений и плагинов
        .pipe(concat('vendor.min.js')) // Конкатенация (объединение) JS-файлов в один файл vendor.min.js
        .pipe(uglify()) // Минификация файла vendor.min.js
        .pipe(gulp.dest(jsVendorDest)); // Сохранение минифицированного файла vendor.min.js в папку src/assets/js
});

// Таск по переносу содержимого папок fonts внешних приложений и плагинов
gulp.task('fontsVendor', function () {
    return gulp.src(fontsVendorSrc) // Сбор содержимого папок fonts внешних приложений и плагинов
        .pipe(gulp.dest(fontsVendorDest)); // Сохранение в папку src/assets/fonts
});

// Development-сборка:
gulp.task('build', ['pug', 'stylus', 'js', 'cssVendor', 'jsVendor', 'fontsVendor']);

// Таск предварительной очистки (удаления) distribution-папки dist:
gulp.task('clean', function() {
   return del(distDir); // удаление distribution-папки
});

// Обработка изображений и перенос их из development-папки в distribution:
gulp.task('img', ['clean'], function() {
    return gulp.src(imgSrc)
        .pipe(imagemin({use: [pngquant()]}))
        .pipe(gulp.dest(imgDest));
});

// Таск для копирования результатов сборки в distribution-папку:
gulp.task('dist', ['img'], function () {
    var htmlDist = gulp.src(htmlSrc)
        .pipe(gulp.dest(distDir)); // Перенос HTML-файлов
    var cssDist = gulp.src(cssDistSrc)
        .pipe(gulp.dest(cssDistDest)); // Перенос CSS-файлов
    var jsDist = gulp.src(jsDistSrc)
        .pipe(gulp.dest(jsDistDest)); // Перенос JS-файлов
    var fontsDist = gulp.src(fontsDistSrc)
        .pipe(gulp.dest(fontsDistDest)); // Перенос fonts
    return htmlDist, cssDist, jsDist, fontsDist;
});

gulp.task('default', ['serve']);
