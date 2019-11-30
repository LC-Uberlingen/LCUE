var gulp = require('gulp');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var babel = require('gulp-babel');
var cleanJs = require('gulp-uglify');

// Config
var today = new Date().toISOString().slice(0,10); // yyyy-mm-dd
var releaseFolder = './release/' + today;

// Generic Functions
const cp = (src, dest) => {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
}

// const clean = () => {
//     return del(releaseFolder, {force:true});
// }

// Copy website files
const cpWeb = () => {
    return cp('./*.html', releaseFolder)
}

const cpImg = () => { 
    return cp('./img/**/*', releaseFolder + '/img');
}

const cpVendor = () => { 
    return cp('./vendor/**/*', releaseFolder + '/vendor');
}

const cpDownload = () => { 
    return cp('./download/*', releaseFolder + '/download');
}

// Compile, copy and minify stylesheets
const compileLess = () => {
    return gulp.src('./css/*.less')
        .pipe(less())
        .pipe(gulp.dest(releaseFolder + '/css'));
}

const copyCss = () => {
    return cp('./css/*.css', releaseFolder + '/css');
}

const minifyCss = () => {
    return gulp.src(releaseFolder + '/css/*.css')
        .pipe(cleanCss({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize} -> ${details.stats.minifiedSize}`);
        }))
    .pipe(gulp.dest(releaseFolder + '/css'));
}

// Copy and minify js
const copyJs = () => {
    return cp('./js/*.js', releaseFolder + '/js');
}

const transpileJs = () => {
    return gulp.src(releaseFolder + '/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(releaseFolder + '/js'));
}

const minifyJs = () => {
    return gulp.src(releaseFolder + '/js/*.js')
        .pipe(cleanJs())
        .pipe(gulp.dest(releaseFolder + '/js'));
}

// Default for build
const release = gulp.series(
    cpWeb, cpImg, cpVendor, cpDownload, 
    compileLess, copyCss, minifyCss,
    copyJs, transpileJs, minifyJs
);

// Debug: No minification
const debug = gulp.series(
    cpWeb, cpImg, cpVendor, cpDownload, 
    compileLess, copyCss,
    copyJs
);




// Export
exports.default = release;
exports.debug = debug;