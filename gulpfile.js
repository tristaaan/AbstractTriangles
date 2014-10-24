var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('less', function () {
  gulp.src('./css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(reload({ stream:true }));
});

gulp.task('reload', function(){
	gulp.pipe(reload({ stream:true }));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch('css/*.less', ['less']);
  gulp.watch(['*.html', 'js/**/*.js'], {cwd:'.'}, reload);
});

