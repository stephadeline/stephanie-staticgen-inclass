const gulp = require('gulp');
import browserSync from 'browser-sync';
const reload = browserSync.reload;
 
module.exports = () => {
  browserSync({
    notify: false,
    server: 'docs',
    port: 3000
  });
  gulp.watch(['src/njk/**/*.html','src/njk/**/*.njk','src/njk/**/*.json'], ['nunjucks', reload]);
  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss','src/scss/**/*.scss'],
    ['styles', reload]
  );
  gulp.watch(['src/js/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['src/assets/img/**/*'], ['images', reload]);
};