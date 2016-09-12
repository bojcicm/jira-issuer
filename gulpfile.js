var gulp = require('gulp'),
run = require('gulp-run'),
livereload = require('gulp-livereload')

var appFolder = ['src/**/*.js', 'src/**/*.html','src/*.css'];

gulp.task('filesChanges', function(){
    console.log("file changed");
    gulp.src(appFolder)
    .pipe(livereload());
})

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(appFolder, ['filesChanges']);
})

gulp.task('run', function(){
    return run('electron .').exec();
})

gulp.task('default', ['watch', 'run']);