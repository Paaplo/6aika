'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');



    
gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(browserSync.reload({stream: true}));
});



gulp.task('browsersync',function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}); 

 

gulp.task('watch', function () {
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./**/*.js').on('change', browserSync.reload);
  gulp.watch('./**/*.css', ['css']); 

});

gulp.task('default', [ 'browsersync', 'watch']);