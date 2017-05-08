var gulp = require('gulp'); // Importa gulp 
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');

// source and distribution folder
var source = 'src/',
    dest = 'dist/';

var fontAwesome = {
    fontsTaskName: 'fontTask',
    fonts: './node_modules/font-awesome/fonts/',
    scssPath: './node_modules/font-awesome/scss/',
}

var bootstrapSass = { in: './node_modules/bootstrap-sass/' }

// sass config esto es un objeto solo para guardar la configuración de la tarea que definiremos mas adelante bro
var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist/css/',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets', fontAwesome.scssPath]
    }
};


// compila sass
gulp.task(sassConfig.compileSassTaskName, function(){
    gulp.src(sassConfig.entryPoint)    // cargo el style.scss
    //.pipe(sourcemaps.init())    // empezamos a capturar los sourcemaps
    .pipe(sass(sassConfig.sassOpts).on('error', function(error){ // compilamos sass
        return notify().write(error); // si ocurre un error, mostramos notifiación
    }))
    //.pipe(postcss([autoprefixer(), cssnano()])) // autoprefija el css y lo minifica
    //.pipe(sourcemaps.write('./'))   // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(sassConfig.dest))      // dejo el resultado en ./dist/
    .pipe(browserSync.stream())     // recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado"));
});

gulp.task('default', [sassConfig.compileSassTaskName, fontAwesome.fontsTaskName] , function(){
    
	// iniciar BrowserSync
    browserSync.init({
        // server: "./", // levanta servidor web en carpeta actual
        proxy: "127.0.0.1:8000", // actúa como proxy enviando las peticiones a sparrest
    });

    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]); //Inicia un observador para SASS


    gulp.watch("*.html").on("change", browserSync.reload); //Inicia un observador para los HTMLS

});

gulp.task(fontAwesome.fontsTaskName, function() {
    gulp.src(fontAwesome.fonts + '**/*')
    .pipe(gulp.dest('./dist/fonts'));
});




