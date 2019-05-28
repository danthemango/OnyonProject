const { watch } = require('gulp');
const log = require('gulp-log');

function defaultTask(cb) {
   // place code for your default task here
   log('hello world');
   cb();
 }

 exports.build = cb => {
    log('build');
    cb();
 };

 exports.watch = () => watch('./', defaultTask);
 exports.default = defaultTask;

// gulp.task('testme', () => console.log('hello world'));
// gulp.taks('default', 'testme');