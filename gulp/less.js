import gulp from 'gulp';
import less from 'gulp-less';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import livereload from 'gulp-livereload';
import {APP_PATH, DEV_BUILD_PATH} from './const';
import handleError from './handleError';


gulp.task('less', () => {
    /* eslint no-console: 0 */
    console.info('-> less...');

    let lessifier = less({
        paths: [APP_PATH]
    }).on('error', handleError);

    return gulp.src([APP_PATH + '/**/*.less'])
        .pipe(sourcemaps.init())
        .pipe(lessifier)
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEV_BUILD_PATH))
        .pipe(livereload());
});
