const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');



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
    },

    i: {
        src: 'src/images/i/*svg',
        dest: 'build/images/i'
    },

    fonts: {
        src: 'src/fonts/*',
        dest: 'build/fonts'
    }
}

//oчистка
function clean() {
    return del(paths.root);
}

// Переносим шрифты
function fonts () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
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
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.style.dest));
        
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




// Переносим скрипт
function scripts () {
    return gulp.src(paths.scripts.src)
        .pipe(gulpWebpack({
            // entry: './path/to/my/entry/file.js',
            output: {
                filename: 'app.js'
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                })
            ],
            devtool: 'eval'
        }, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}
// Спрайт свг
function sprite () {
    return gulp.src('./src/images/i/*')
	// minify svg
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg",
            }
        }
    }))
    .pipe(gulp.dest('build/images/sprite'));
}


exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.scripts = scripts;
exports.sprite = sprite;


gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts, sprite, fonts),
    gulp.parallel(watch, server)
));

