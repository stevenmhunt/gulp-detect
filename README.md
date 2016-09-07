# gulp-detect
Wraps your module-agnostic library code to support CommonJS, RequireJS and standard browser environments.

# Installation

    > npm install gulp-detect
    
# Usage

    var detect = require('gulp-detect');
    
    gulp.task('build', function() {
        return gulp.src(['./mainFile.js'])
            .pipe(detect('globalVar'))
            .pipe(gulp.dest('./dist'));
    });

#### detect (globalVariable)
- globalVariable - The name of the global variable to use within your project to add objects to or to set as the default export. The default value is `globalObject`.

# How it works

The gulp-detect module will take your file streams, and wrap them in an Immediately Invoking Function (IIF) 
to prevent unnecessary entries into `window` if in the browser. Then, it will add environment detection code
which will automatically determine the environment and register then given global variable to either a RequireJS module,
a CommonJS module, or the global `window` object in the browser. Here is a sample of what the transformed file looks like:

    
    (function () {
        var _detectedModuleType;
        if (typeof define === 'function' && define.amd) {
            _detectedModuleType = 'RequireJS';
        }
        else if (typeof module === 'object' && module.exports) {
            _detectedModuleType = 'CommonJS';
        }
        else if (typeof window !== 'undefined') {
            _detectedModuleType = 'Browser';
        }
        else {
            throw 'Error: No browser or module system detected!';
        }
        var YOUR_GLOBAL_NANE_HERE = {};
    
    // your code gets put here.
    
        switch (_detectedModuleType) {
            case 'RequireJS':
                define(['YOUR_GLOBAL_NANE_HERE'], YOUR_GLOBAL_NANE_HERE);
                break;
            case 'CommonJS':
                module.exports = YOUR_GLOBAL_NANE_HERE;
                break;
            case 'Browser':
                window.YOUR_GLOBAL_NANE_HERE = YOUR_GLOBAL_NANE_HERE;
                break;
       }
    })();
    
Note that anything that you wish to expose across module systems must be registered with the global name provided to the `detect()` function call.