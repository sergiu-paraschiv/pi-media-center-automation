import gulp from 'gulp';
import watch from 'gulp-watch';
import livereload from 'gulp-livereload';
import {APP_PATH} from './const';
import './browserify';
import './less';

gulp.task('watch', ['browserify'], () => livereload.listen());
gulp.task('watchLess', [], () => watch(APP_PATH + '/**/*.less', () => gulp.start('less')));
