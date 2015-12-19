import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {BACKEND_APP_PATH, APP_PATH} from './const';

gulp.task('lint', () => {
    let formatter = eslint.format();
    return gulp.src(['./gulpfile.babel.js', './gulp/**/*.js', APP_PATH + '/**/*.js', BACKEND_APP_PATH + '/**/*.js'])
        .pipe(eslint())
        .pipe(formatter);
});
