const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
 
module.exports = () => {
  return gulp.src('./src/assets/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('./docs/assets/img'))
};
