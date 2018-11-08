const gulp = require('gulp');
import runSequence from 'run-sequence';

// load gulp tasks from ./tasks
require('gulp-load-tasks')();

// default tasks
gulp.task('default', cb =>
  runSequence(
    'clean',
    'styles',
    'copy',
    ['lint', 'scripts', 'images'],
    'nunjucks',
    cb
  )
);

gulp.task('dev', cb =>
  runSequence(
    'default',
    'serve',
    cb
  )
);
