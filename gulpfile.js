// Declare global scope variables.
const gulp = require('gulp') // load the gulp library
const sass = require('gulp-sass') // load the gulp-sass compiler library
const sassPath = './scss/**/*.scss' // the folder(s) with our Sass source files
const postcss = require('gulp-postcss') // load the postcss library
const autoprefixer = require('autoprefixer') // load the autoprefixer plugin
const cssnano = require('cssnano') // load the cssnano plugin

// Define a new task called 'sass' that we can call to compile Sass to CSS
gulp.task('sass', function () {
  // Create a plugins variable with the names and configuration parameters
  // of the PostCSS plugins that we want to use.
  const plugins = [
    autoprefixer({
      browsers: ['last 3 version']
    }),
    cssnano()
  ]
  // Now lets tell gulp what to do ...
  return gulp
    .src(sassPath) // where to find the Sass source files (use our variable)
    .pipe(sass()) // forward those files to the compiler
    .pipe(gulp.dest('./css')) // where to output the interim compiled css
    .pipe(postcss(plugins)) // apply the PostCSS plugins
    .pipe(gulp.dest('./css/min')) // where to output the final minimized CSS files
})

// Define a new default task (so we can just call 'gulp' on the command line)
// to automatically compile when we save changes to our Sass files
gulp.task('default', function () {
  gulp.watch(
    sassPath, // which files to watch for changes (use our variable)
    ['sass']) // an array of tasks to run when changes are detected.
})