'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    debug = require('gulp-debug'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var paths = {
    clean: {
        app: [
            './app/*.html',
            './app/libs',
            './app/assets/css',
            './app/assets/js'
        ],
        dist: [
            './dist/assets',
            './dist/libs'
        ]
    },
    watch: {
        html: './app/pug/**/*.pug',
        css: [
            './app/blocks/**/*.styl',
            './app/config/**/*.styl'],
        js: './app/blocks/**/*.js',
    },
    app: {
        html: {
            src: './app/pug/pages/*.pug',
            dest: './app'
        },
        custom: {
            css: {
                src: [
                    './app/config/fonts.styl',
                    './app/config/vars.styl',
                    './app/config/mixins.styl',
                    './app/config/reset.styl',
                    './app/blocks/**/*.styl'
                ],
                dest: './app/assets/css'
            },
            js: {
                src: './app/blocks/**/*.js',
                dest: './app/assets/js'
            }
        },
        libs: {
            jquery: {
                src: [
                    './app/bower_components/jquery/dist/jquery.min.js',
                    './app/bower_components/jquery/LICENSE.txt'
                ],
                dest: './app/libs/jquery'
            },
            bootstrap: {
                src: [
                    './app/bower_components/bootstrap/dist/css/bootstrap.min.css',
                    './app/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    './app/bower_components/bootstrap/LICENSE'
                ],
                dest: './app/libs/bootstrap'
            },
            fontAwesome: {
                src: [
                    './app/bower_components/font-awesome/web-fonts-with-css/**/*.*',
                    './app/bower_components/font-awesome/LICENSE.txt',
                ],
                dest: './app/libs/font-awesome'
            },
            animateCSS: {
                src: [
                    './app/bower_components/animate.css/animate.min.css',
                    './app/bower_components/animate.css/LICENSE'
                ],
                dest: './app/libs/animate.css'
            },
            wow: {
                src: [
                    './app/bower_components/wow/dist/wow.min.js',
                    './app/bower_components/wow/LICENSE-MIT'
                ],
                dest: './app/libs/wow'
            },
            parallaxJS: {
                src: [
                    './app/bower_components/parallax.js/parallax.min.js',
                    './app/bower_components/parallax.js/LICENSE'
                ],
                dest: './app/libs/parallax.js'
            },
            pageScroll2ID: {
                src: './app/bower_components/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
                dest: './app/libs/page-scroll-to-id'
            }
        }
    },
    img: {
        src: './app/assets/images/**/*.*',
        dest: './dist/assets/images'
    },
    dist: {
        css: {
            src: './app/assets/css/custom.min.css',
            dest: './dist/assets/css'
        },
        js: {
            src: './app/assets/js/custom.min.js',
            dest: './dist/assets/js'
        },
        fonts: {
            src: './app/assets/fonts/**/*.*',
            dest: './dist/assets/fonts'
        },
        libs: {
            src: './app/libs/**/*.*',
            dest: './dist/libs'
        }
    }
}

gulp.task('serve', function () {
    browserSync.init({server: './app'});
    gulp.watch(paths.watch.html, gulp.series('html'));
    gulp.watch(paths.watch.css, gulp.series('css'));
    gulp.watch(paths.watch.js, gulp.series('js'));
    gulp.watch(paths.watch.html).on('change', reload);
});

gulp.task('html', function () {
    return gulp.src(paths.app.html.src)
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.app.html.dest))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src(paths.app.custom.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('custom.min.styl'))
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.app.custom.css.dest))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(paths.app.custom.js.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('custom.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.app.custom.js.dest))
        .pipe(browserSync.stream());
});

gulp.task('jquery', function () {
    return gulp.src(paths.app.libs.jquery.src)
        .pipe(gulp.dest(paths.app.libs.jquery.dest));
});

gulp.task('bootstrap', function () {
    return gulp.src(paths.app.libs.bootstrap.src)
        .pipe(gulp.dest(paths.app.libs.bootstrap.dest));
});

gulp.task('fontAwesome', function () {
    return gulp.src(paths.app.libs.fontAwesome.src)
        .pipe(gulp.dest(paths.app.libs.fontAwesome.dest));
});

gulp.task('animateCSS', function () {
    return gulp.src(paths.app.libs.animateCSS.src)
        .pipe(gulp.dest(paths.app.libs.animateCSS.dest));
});

gulp.task('wow', function () {
    return gulp.src(paths.app.libs.wow.src)
        .pipe(gulp.dest(paths.app.libs.wow.dest));
});

gulp.task('parallaxJS', function () {
    return gulp.src(paths.app.libs.parallaxJS.src)
        .pipe(gulp.dest(paths.app.libs.parallaxJS.dest));
});

gulp.task('pageScroll2ID', function () {
    return gulp.src(paths.app.libs.pageScroll2ID.src)
        .pipe(gulp.dest(paths.app.libs.pageScroll2ID.dest));
});

gulp.task('cleanApp', function () {
    return del(paths.clean.app);
});

gulp.task('cleanDist', function () {
    return del(paths.clean.dist);
});

gulp.task('img', function () {
    return gulp.src(paths.img.src)
        .pipe(imagemin({use: [pngquant()]}))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('dist', function () {
    var cssDist = gulp.src(paths.dist.css.src)
        .pipe(gulp.dest(paths.dist.css.dest));
    var jsDist = gulp.src(paths.dist.js.src)
        .pipe(gulp.dest(paths.dist.js.dest));
    var fontsDist = gulp.src(paths.dist.fonts.src)
        .pipe(gulp.dest(paths.dist.fonts.dest));
    var libsDist = gulp.src(paths.dist.libs.src)
        .pipe(gulp.dest(paths.dist.libs.dest));
    return cssDist, jsDist, fontsDist, libsDist;
});

gulp.task('build', gulp.parallel('cleanApp', 'html', 'css', 'js'));

gulp.task('libs', gulp.parallel('jquery', 'bootstrap', 'fontAwesome', 'animateCSS', 'wow', 'parallaxJS', 'pageScroll2ID'));

gulp.task('public', gulp.series('cleanDist', 'img', 'dist'));

gulp.task('default', gulp.series('build', 'libs', 'serve'));
