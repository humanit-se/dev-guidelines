# Gulp - Quick guide

## Installation

**1. Install npm**   
Install [node.js](https://nodejs.org) where npm is a included.

**2. Init npm to create package.json**   
```
npm init
```
Input required information and you'll get a package.json-file that looks something like this:
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
**2. Add your dependencies to package.json**   
First dependency we need is Gulp, add it:
```
npm install gulp --save-dev
```
Now your package.json will look something like this:
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1"
  }
}
```
As you might have guessed by now, you could also just edit the packaged.json-file manually with your favorite fancy text editor.

**3. Add your Gulp required modules as dependencies to package.json**   
What you need to add in this step depends on your project, but most likely you need some sass and js compiler and minifier.

**Good candidates are:**   

* [Gulp Sass](https://www.npmjs.com/package/gulp-sass)   
* [Gulp Concat](https://www.npmjs.com/package/gulp-concat)   
* [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify)   
* [Gulp CSS Nano](https://www.npmjs.com/package/gulp-cssnano)   
* [Gulp Rename](https://www.npmjs.com/package/gulp-rename)   
* [Gulp Plumber](https://www.npmjs.com/package/gulp-plumber)   
* [Gulp Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)   

Either add via ```npm install [package-name] --save-dev``` or manually add it to your package.json-file.

**4. Build your gulpfile.js**   
Create a file called gulpfile.js and add the tasks you need, see bellow for example.

## Example gulpfile.js

```
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');

// Compile Our Sass
gulp.task('sass-dist', function() {
    return gulp.src('source/sass/style.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cssnano({
                mergeLonghand: false,
                zindex: false
            }))
            .pipe(gulp.dest('dist/css'))
});

gulp.task('sass-dev', function() {
    return gulp.src('source/sass/style.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
            .pipe(rename({suffix: '.dev'}))
            .pipe(gulp.dest('dist/css'))
});

// Concatenate & Minify JS
gulp.task('scripts-dist', function() {
    return gulp.src(['source/js/vendor/*.js', 'source/js/**/*.js', '!source/js/admin/*'])
            .pipe(concat('packaged.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(rename('packaged.min.js'))
            .pipe(uglify()).on('error', errorHandler)
            .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist-admin', function() {
    return gulp.src(['source/js/admin/*.js'])
            .pipe(concat('admin.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(rename('admin.min.js'))
            .pipe(uglify()).on('error', errorHandler)
            .pipe(gulp.dest('dist/js'));
});

// Compress images
gulp.task('compress-images', function () {
  gulp.src('source/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('source/js/**/*.js', ['scripts-dist']);
    gulp.watch('source/js/admin/*.js', ['scripts-dist-admin']);
    gulp.watch('source/sass/**/*.scss', ['sass-dist', 'sass-dev']);
    gulp.watch('source/images/**/*', ['compress-images']);
});

// Default Task
gulp.task('default', ['compress-images', 'sass-dist', 'sass-dev', 'scripts-dist', 'watch']);

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
```

**5. Run gulp**
```
gulp
```
This will trigger the default task in the gulpfile and in example above it will trigger compress-images, sass-dist, sass-dev, scripts-dist and watch. In other words, all your sass will be compiled and minfied into folder dist/css as style.min.css. Also all your javascript files are minified and added to dist/js. And much more...
