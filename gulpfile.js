var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') 
    autoprefix = require('gulp-autoprefixer') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower');

var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

var paths = {
    scss: [config.sassPath + '/**.scss', config.bowerDir + '/fontawesome/scss/font-awesome.scss'],
    font: config.bowerDir + '/fontawesome/fonts/**.*',
    js: [config.bowerDir + '/jquery/dist/**.*', config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js']
}
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(paths.font) 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(paths.scss)
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
        .pipe(autoprefix('last 2 version'))
         .pipe(gulp.dest('./public/css')); 
});

gulp.task('js', function() { 
    return gulp.src(paths.js)
        .pipe(gulp.dest('./public/js')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(paths.scss, ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css', 'js']);