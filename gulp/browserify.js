/* eslint no-console: 0 */

import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import livereload from 'gulp-livereload';
import babelify from 'babelify';
import handleError from './handleError';
import {APP_PATH, DEV_BUILD_PATH} from './const';


gulp.task('browserify', () => {
    let bundler = browserify({
        entries: [APP_PATH + '/Main.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler.transform(babelify);

    let watcher = watchify(bundler);

    function rebundle() {
        console.info('-> js...');

        watcher
            .bundle()
            .on('error', handleError)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(DEV_BUILD_PATH))
            .pipe(livereload());
    }

    watcher.on('update', rebundle);

    return rebundle();
});
