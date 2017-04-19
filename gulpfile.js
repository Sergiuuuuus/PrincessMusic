var gulp = require('gulp'); // Importa gulp 
var sass = require('gulp-sass');
var notify = require('gulp-notify');

// source and distribution folder
var source = 'src/',
    dest = 'dist/';


// sass config
var scss = { 
	in : source + 'scss/style.scss',
    out: dest + 'css/',
    //watch: source + 'scss/**/*',
    sourcemaps: './',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        //includePaths: [bootstrapSass.in + 'assets/stylesheets', fontAwesome.scssPath],
    }
};

// compile scss
gulp.task('sass', function() {
    return gulp.src(scss.in)
        // .pipe(sourcemaps.init())
        .pipe(sass(scss.sassOpts).on('error', sass.logError))
		//.pipe(autoprefixer())
        // .pipe(cssnano())
        // .pipe(sourcemaps.write(scss.sourcemaps))
        .pipe(gulp.dest(scss.out))
        .pipe(notify({
            title: "SASS",
            message: "Compiled 🤘 bro"
        }))
        //.pipe(browserSync.stream());
});

gulp.task('default', ["sass"] , function(){
	console.log('Hello World');
});