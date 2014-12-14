var browserSync    = require('browser-sync');
var mainBowerFiles = require('main-bower-files');


module.exports = function (gulp, $, config) {

  var paths = config.paths;

  gulp.task('compile', [
    'bower-libs',
    'traceur',
    'html',
    'less'
  ]);

  gulp.task('bower-libs', function () {
    return gulp.src(mainBowerFiles())
      .pipe($.concat('bower-libs.js'))
      .pipe(gulp.dest(paths['temp']));
  });

  gulp.task('server', [ 'compile' ], function () {
    browserSync({
      server: {
        baseDir: [
          paths['static'],
          paths['temp']
        ]
      },
      ghostMode: false,
      notify: false
    });
  });

  gulp.task('watch', function () {
    gulp.watch(paths['scripts'],             [ 'traceur' ]);
    gulp.watch(paths['less'],                [    'less' ]);
    gulp.watch(paths['src'] + '/index.html', [    'html' ]);
  });

  gulp.task('default', [
    'server',
    'watch'
  ]);

};
