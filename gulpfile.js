

// jade, coffee, stylusのコンパイル + BrowserSync

var gulp = require("gulp");
var browserSync = require("browser-sync");

var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');

var plumber = require('gulp-plumber'); 
var pleeease = require('gulp-pleeease');
var spawn = require('child_process').spawn;//gulpのautoReloadのため


var src = "./src/"
var build = "./build/"



gulp.task("launch_browserSync", function() {
    browserSync({
        server: {
            baseDir: build,
            index  : "index.html"
        }
    });
});





gulp.task('stylus_task', function () {
    gulp.src(src+'styl/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            },
            minifier: false
        }))
        .pipe(gulp.dest(build+'css/'))
});

gulp.task("coffee_task", function() {
    gulp.src(src+"coffee/*.coffee")
        .pipe(plumber())
        .pipe(coffee({bare: false}))
        .pipe(gulp.dest(build+'js/'))
});


gulp.task('jade_task', function () {
    gulp.src(src+'*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true,
            doctype: 'xml'
        }))
        .pipe(gulp.dest(build))
});





gulp.task("css_task", function() {
    gulp.src(build+"css/*.css")
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(dropbox_path))
});

gulp.task("js_task", function() {
    gulp.src(build+"js/*.js")
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(dropbox_path))
});


gulp.task('html_task', function () {
  gulp.src(build+'*.html')
    .pipe(browserSync.reload({stream:true}))
});



gulp.task("start", function() {
    gulp.run('launch_browserSync');
    gulp.run('jade_task');
    gulp.run('stylus_task');
    gulp.run('coffee_task');

    gulp.watch(src+"*.jade",["jade_task"]);
    gulp.watch(src+"*.styl",["stylus_task"]);
    gulp.watch(src+"*.coffee",["coffee_task"]);

    gulp.watch(build+"*.html",["html_task"]);
    gulp.watch(build+"*.css",["css_task"]);
    gulp.watch(build+"*.js",["js_task"]);
});


//----------- gulp の auto reload -------------
gulp.task('default', function() {
    var process;
    function restart() {
        if (process) process.kill();
        process = spawn('gulp', ['start'], {stdio: 'inherit'});
    }
    gulp.watch('gulpfile.js', restart);
    restart();
});

