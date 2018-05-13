const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');



const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug',
        dest: 'build/'
    },
    style: {
        src: 'src/style/**/*.scss',
        dest: 'build/styles'
    },

    images: {
        src: 'src/images/**/*',
        dest: 'build/images'
    },
    scripts: {
        src: 'src/scripts/**/*',
        dest: 'build/scripts'
    }
}

//oчистка
function clean() {
    return del(paths.root);
}

// Переносим картинки
function images () {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

//pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.templates.dest));
}

//scss
function styles() {
    return gulp.src('./src/style/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputstyle: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min' }))
        .pipe(gulp.dest(paths.style.dest))
        
}

//слежка
function watch() {
    gulp.watch(paths.style.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

//следим за build и релоадим браузер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//Webpack
function scripts(){
    return gulp.src('./src/scripts/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts),
    gulp.parallel(watch, server)
));

