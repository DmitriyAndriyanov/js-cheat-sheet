const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rigger = require('gulp-rigger'),
      plumber = require('gulp-plumber'),
      autoprefixer = require('gulp-autoprefixer'),
      concat = require('gulp-concat'),
      minifyCss  = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      del = require('del'),
      browserSync = require('browser-sync').create(),
      sourcemaps = require('gulp-sourcemaps'),
      imagemin = require('gulp-imagemin');

const path = {
  build: {
    html: 'docs/',
    styles: 'docs/css/',
    fonts: 'docs/fonts/',
    img: 'docs/images/',
    js: 'docs/js/'
  },
  src: {
    html: 'src/*.html',
    cssLibs: 'src/styles/libs/**/*',
    styles: 'src/styles/*.scss',
    fonts: 'src/fonts/**/*',
    img: 'src/images/**/*',
    jsLibs: 'src/js/libs/**/*.js',
    js: 'src/js/script/**/*.js'
  },
};

// Styles
function styles() {
  return gulp.src([path.src.cssLibs, path.src.styles])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    //.pipe(minifyCss())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .on('error', logError)
    .pipe(gulp.dest(path.build.styles))
    .pipe(browserSync.stream());
}

// Scripts
function scripts() {
  return gulp.src([path.src.jsLibs, path.src.js])
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(uglify())
    .on('error', logError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest((path.build.js)))
    .pipe(browserSync.stream());
}

// Html
function html() {
  return gulp.src(path.src.html)
    .pipe(plumber())
    .on('error', logError)
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
}

// Fonts
function fonts() {
  return gulp.src(path.src.fonts)
    .on('error', logError)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return gulp.src(path.src.img)
    .pipe(plumber())
    //.pipe(imagemin())
    .on('error', logError)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
}

// Task for deleting files in the public folder
gulp.task('clear', () => del(['docs/*']));

// Task for browser synchronization
gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: [ 'docs' ]
    },
    port: 3000,
    open: false
  });
});

// Task for watching changes
gulp.task('watch', () => {
  const watchImages = [
    path.src.img + '.+(png|jpg|jpeg|gif|svg|ico)'
  ];

  const watch = [
    'src/*.html', // html
    'src/styles/**/*.scss', // styles
    'src/fonts/*.*', // fonts
    'src/images/**', // img
    'src/js/**/*.js' // js
  ];

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
});

// Errors tracker
var logError =  function(error) {
  console.log(error.toString());
  this.emit('end');
};

// Run styles task
gulp.task('styles', styles);

// Run scripts task
gulp.task('scripts', scripts);

// Run html task
gulp.task('html', html);

// Run images task
gulp.task('images', images);

// Run fonts task
gulp.task('fonts', fonts);

// Task for deleting files in the public folder and running styles and scripts
gulp.task('build', gulp.series('clear','styles', 'scripts', 'html', 'fonts', 'images'));
// Task for generating files for development
gulp.task('dev', gulp.series(gulp.parallel('styles', 'scripts', 'html', 'fonts', 'images')));
// Default Gulp Task with watching changes
gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
