import gulp from 'gulp';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import collapse from 'bundle-collapser/plugin';
import {BUILD_PATH, VENDOR_LIBS} from '../const';
import handleError from '../handleError';

gulp.task('buildBrowserifyVendor', () => {
    process.env.NODE_ENV = 'production';

    let bundler = browserify({
        entries: ['./gulp/build/noop.js'],
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: false
    });

    VENDOR_LIBS.forEach((lib) => bundler.require(lib));

    return bundler
        .plugin(collapse)
        .bundle()
        .on('error', handleError)
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_PATH));
});
