// generated on 2016-02-04 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {
  stream as wiredep
} from 'wiredep';
var jade = require('gulp-jade');
var imageop = require('gulp-image-optimization');
var image = require('gulp-image');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('jade', function() {
  return gulp.src('app/index.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('.tmp/'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({
        stream: true,
        once: true
      }))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['jade','styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.']
    }))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest('../public'));
});
gulp.task('images', () => {
	return gulp.src('app/images/**/*')
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    }))
    .pipe(imagemin({
			progressive: true,
      interlaced:true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest('../public/images'));
});
//gulp.task('images', () => {
  //return gulp.src('app/images/**/*')
    //.pipe($.if($.if.isFile, $.cache($.imagemin({
      //  progressive: true,
        //interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        //svgoPlugins: [{cleanupIDs: false}]
      //}))
      //.on('error', function(err) {
        //console.log(err);
        //this.end();
      //})))
    //.pipe(gulp.dest('../public/images'));
//});*/

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
      .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('../public/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/**/.jade',
    '!app/*.jade'
  ], {
    dot: true
  }).pipe(gulp.dest('../public'));
});

gulp.task('clean', del.bind(null, ['.tmp', '../public']));


gulp.task('serve', ['jade', 'styles', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    '.tmp/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/*.jade', ['jade']);
  gulp.watch('app/views/*.jade', ['jade']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['../public']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
