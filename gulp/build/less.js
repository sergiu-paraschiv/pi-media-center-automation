import gulp from 'gulp';
import less from 'gulp-less';
import lessImport from 'gulp-less-import';
import concat from 'gulp-concat';
import minifyCss from 'gulp-minify-css';
import {APP_PATH, BUILD_PATH} from '../const';
import handleError from '../handleError';

gulp.task('buildLess', () => {
    let lessifier = less({
        paths: [APP_PATH, './node_modules']
    }).on('error', handleError);

    return gulp.src([APP_PATH + '/**/*.less'])
        .pipe(lessImport('app.less'))
        .pipe(lessifier)
        .pipe(concat('bundle.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(BUILD_PATH));
});
