const gulp = require( 'gulp' );
const rollup = require( 'rollup' );
const babel = require( 'rollup-plugin-babel' );
const resolve = require( 'rollup-plugin-node-resolve' );
const commonjs = require( 'rollup-plugin-commonjs' );
const eslint = require( 'rollup-plugin-eslint' );

const runSequence = require( 'run-sequence' );
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const rimraf = require( 'rimraf' );

gulp.task( 'scripts', () => {
    return rollup.rollup({
        entry: './app/scripts/main.js',
        plugins: [ 
            babel({
                exclude: 'node_modules/**',
            }),
            eslint({
                exclude: [
                    './app/styles/**',
                ]
            })
        ]
    }).then( ( bundle )=> {
        bundle.write( {
            dest: "./build/scripts/main.js",
            moduleName: 'ProjectName',
            format: 'umd'
        } );
    });
});

gulp.task('views', function buildHTML() {
  return gulp.src('./app/views/**/*.pug')
  .pipe( pug() )
  .pipe( gulp.dest('./build') );
});

gulp.task('styles', function () {
  return gulp.src('./app/styles/**/*.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe( gulp.dest('./build/styles') );
});

gulp.task( 'clean', ( cb ) => {
    rimraf( './dist', cb );
});

gulp.task( 'build', ( callback ) => {
    runSequence( 'clean', 'scripts', 'styles', 'views', callback );
});

gulp.task( 'watch', ()=> {
    let fn = ( event )=> {
        console.log( `\n[${event.type}]: ${event.path}` );
    }
    gulp.watch( [ 'app/**/*.js' ], [ 'scripts' ] ).on( 'change', fn );
    gulp.watch( [ 'app/**/*.scss' ], [ 'styles' ] ).on( 'change', fn );
    gulp.watch( [ 'app/**/*.pug' ], [ 'views' ] ).on( 'change', fn );
});