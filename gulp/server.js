import gulp from 'gulp';
import connect from 'gulp-connect';
import proxy from 'http-proxy-middleware';
import {DEV_BUILD_PATH} from './const';


gulp.task('server', () => {
    connect.server({
        root: DEV_BUILD_PATH,
        port: 3011,
        host: '0.0.0.0',
        fallback: DEV_BUILD_PATH + '/index.html',
        middleware: () => [
            proxy('/api', {
                target: 'http://localhost:8080'
            })
        ]
    });
});
