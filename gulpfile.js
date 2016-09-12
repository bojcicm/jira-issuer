var gulp = require('gulp'),
run = require('gulp-run'),
livereload = require('gulp-livereload');
var winInstaller = require('electron-windows-installer');

var appFolder = ['scripts/**/*.js', 'scripts/**/*.html','styles/*.css', '*.html', '*.js'];

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

gulp.task('create-windows-installer', function(done) {
  winInstaller({
    appDirectory: './releases/jira-issuer-win32-x64',
    outputDirectory: './install',
    authors: 'mbojcic',
    setupIcon: 'file.ico'
  }).then(done).catch(done);
});

gulp.task('default', ['watch', 'run']);