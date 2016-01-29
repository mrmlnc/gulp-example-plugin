'use strict';
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const through = require('through2');
const trimLeft = require('trim-left');

module.exports = () => {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-example-plugin', 'Streaming not supported'));
      return;
    }

    try {
      const data = file.contents.toString()
        .split('\n')
        .map((line) => trimLeft(line))
        .join('');
      file.contents = new Buffer(data);
      this.push(file);
    } catch (err) {
      this.emit('error', new PluginError('gulp-example-plugin', err));
    }

    cb();
  });
};
