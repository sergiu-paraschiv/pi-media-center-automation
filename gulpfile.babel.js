import gulp from 'gulp';
import './gulp/lint';
import './gulp/server';
import './gulp/watch';
import './gulp/build/less';
import './gulp/build/browserifyVendor';
import './gulp/build/browserify';

gulp.task('devRun', ['less', 'watch', 'watchLess', 'server']);
gulp.task('dev', ['devRun']);

gulp.task('buildVendor', ['buildBrowserifyVendor']);
gulp.task('buildRun', ['buildLess', 'buildBrowserify']);
gulp.task('build', ['buildRun']);
