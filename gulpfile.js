/**
 * Created by lorho_j on 27/10/15.
 */
var changed = require('gulp-changed');
var childProcess = require('child_process');
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var tsd = require('tsd');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var packageJson = require('./package.json');

var spawn = childProcess.spawn;
var server;

var PATHS = {
    lib: [
        'node_modules/reflect-metadata/Reflect.js',
        '!node_modules/systemjs/dist/*.src.js',
        'node_modules/systemjs/dist/*.js'
    ],
    typings: 'typings/tsd.d.ts',
    client: {
        ts: 'public/**/*.ts',
        html: 'public/**/*.html',
        css: 'public/**/*.css',
        img: 'public/**/*.{svg,jpg,png,ico}'
    },
    dist: 'dist',
    distClient: 'dist/client',
    distLib: 'dist/lib',
    port: 8080
};

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('clean', function(done) {
    del([PATHS.dist + '/*.*']).then(function(paths) {
        done();
    });
});

gulp.task('tsd', function() {
    var tsdAPI = tsd.getAPI('tsd.json');
    return tsdAPI.readConfig({}, true).then(function() {
        return tsdAPI.reinstall(
            tsd.Options.fromJSON({})
        ).then(function() {
                return tsdAPI.updateBundle(tsdAPI.context.config.bundle, true);
            });
    });
});

gulp.task('angular2', function() {
    return gulp
        .src([
            //'node_modules/angular2/es6/**',
            //'node_modules/angular2/bundles/**',
            'node_modules/angular2/**/*'
          //'!node_modules/angular2/node_modules/**',
            //'!node_modules/angular2/es6/**',
            //'!node_modules/angular2/ts/**',
            //'!node_modules/angular2/angular2.api.js',
            //'!node_modules/angular2/angular2_sfx.js',
            //'!node_modules/angular2/angular2.api.js',
            //'node_modules/angular2/**/*.js'
        ])
        .pipe(gulp.dest(PATHS.dist + '/lib/angular2'));
});

gulp.task('libs', ['tsd', 'angular2'], function() {
    return gulp
        .src(PATHS.lib)
        .pipe(gulp.dest(PATHS.distLib));
});

gulp.task('ts', function() {
    return gulp
        .src([PATHS.typings, PATHS.client.ts])
        .pipe(changed(PATHS.distClient, {
            extension: '.js'
        }))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('lint', function() {
    return gulp
        .src(PATHS.client.ts)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
});

gulp.task('html', function() {
    return gulp
        .src(PATHS.client.html)
        .pipe(changed(PATHS.distClient))
        .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('css', function() {
    return gulp
        .src(PATHS.client.css)
        .pipe(changed(PATHS.distClient, {
            extension: '.css'
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('img', function() {
    return gulp
        .src(PATHS.client.img)
        .pipe(changed(PATHS.distClient))
        .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('bundle', function(done) {
    runSequence('clean', ['libs', 'lint', 'ts', 'html', 'css', 'img'], done);
});

gulp.task('server:restart', function(done) {
    var started = false;
    if (server) {
        server.kill();
    }
    server = spawn('node', [packageJson.main]);
    server.stdout.on('data', function(data) {
        console.log(data.toString());
        if (started === false) {
            started = true;
            done();
        }
    });
    server.stderr.on('data', function(data) {
        console.error(data.toString());
    });
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (server) {
        server.kill();
    }
});

gulp.task('play', ['bundle', 'server:restart'], function() {
    gulp.watch(PATHS.client.ts, ['ts']);
    gulp.watch(PATHS.client.html, ['html']);
    gulp.watch(PATHS.client.css, ['css']);
    gulp.watch(PATHS.client.img, ['img']);
    gulp.watch(packageJson.main, ['server:restart']);
});

gulp.task('default', ['bundle']);