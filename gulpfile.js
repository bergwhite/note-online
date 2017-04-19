const gulp = require('gulp'),
    less = require("gulp-less"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');

gulp.task('compile-css', () =>
    gulp.src('src/less/*.less')
    // Less转CSS
    .pipe(less())
    // 压缩CSS
    .pipe(minifyCss())
    /* 改名
    .pipe(rename(function(path){
        path.basename += '.min'
    }))*/
    .pipe(gulp.dest('dist/css'))
);
gulp.task('compile-js', () =>
    gulp.src('src/js/*.js')
    // es6转es5
    .pipe(babel({
        presets: ['es2015']
    }))
    // 压缩JS
    .pipe(uglify())
    /* 改名
    .pipe(rename(function(path){
        path.basename += '.min'
    }))*/
    .pipe(gulp.dest('dist/js'))
);
gulp.task('copy-index', () => 
    gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
);
gulp.task('copy-api', () =>
    gulp.src('src/api/*/*')
    .pipe(gulp.dest('dist/api'))
);
gulp.task('copy-conn', () =>
    gulp.src('src/conn.php')
    .pipe(gulp.dest('dist'))
);
gulp.task('rename', () =>
    gulp.src('./dist/*/*')
    .pipe(rename(function(path){
        path.basename += '.min'
    }))
    .pipe(gulp.dest('./dist'))
);
gulp.task('copy',['copy-index','copy-api','copy-conn'])
gulp.task('build',['compile-css','compile-js','copy']);