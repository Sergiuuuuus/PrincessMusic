var gulp = require('gulp'); // Importa gulp 
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');

// source and distribution folder
var source = 'src/',
    dest = 'dest/';

var fontAwesome = {
    fontsTaskName: 'fontTask',
    fonts: './node_modules/font-awesome/fonts/',
    scssPath: './node_modules/font-awesome/scss/',
}

var bootstrapSass = { in: './node_modules/bootstrap-sass/' }

// sass config esto es un objeto solo para guardar la configuración de la tarea que definiremos mas adelante bro
var scss = { 
	in : source + 'scss/style.scss', //El punto de entrada
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sourcemaps: './',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets', fontAwesome.scssPath],
    }
};


// compile scss
gulp.task('sass', function() {
    return gulp.src(scss.in)
        // .pipe(sourcemaps.init()) 
        .pipe(sass(scss.sassOpts).on('error', sass.logError)) //procesa SASS
		//.pipe(autoprefixer())
        // .pipe(cssnano())
        // .pipe(sourcemaps.write(scss.sourcemaps))
        .pipe(gulp.dest(scss.out)) //Lo guarda en el archivo 
        .pipe(notify({
            title: "SASS",
            message: "Compiled 🤘 bro"
        }))
        .pipe(notify({
            title: "SASS",
            message: "CSS actualizado en el navegador 🤘 bro"
        }))
        .pipe(browserSync.stream()); // Envia los cambios de CSS al navegador.
        //.pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ["sass"] , function(){
    console.log("hola Simone");
	// iniciar BrowserSync
    browserSync.init({
        // server: "./", // levanta servidor web en carpeta actual
        proxy: "127.0.0.1:8000", // actúa como proxy enviando las peticiones a sparrest
    });

    gulp.watch(scss.watch, ["sass"]); //Inicia un observador para SASS


    gulp.watch("*.html").on("change", browserSync.reload); //Inicia un observador para los HTMLS

});