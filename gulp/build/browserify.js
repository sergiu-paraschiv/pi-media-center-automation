import gulp from 'gulp';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import collapse from 'bundle-collapser/plugin';
import babelify from 'babelify';
import {APP_PATH, BUILD_PATH, VENDOR_LIBS} from '../const';
import handleError from '../handleError';

gulp.task('buildBrowserify', () => {
    process.env.NODE_ENV = 'production';

    let bundler = browserify({
        entries: [APP_PATH + '/Main.js'],
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: false
    });

    bundler.transform(babelify);

    VENDOR_LIBS.forEach((lib) => bundler.external(lib));

    return bundler
        .plugin(collapse)
        .bundle()
        .on('error', handleError)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_PATH));
});
