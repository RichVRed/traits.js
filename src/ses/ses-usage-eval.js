// To start SES under nodejs
// Adapted from https://gist.github.com/3669482

// Running the following command in a directory with the SES sources
//    $ node ses-usage.js
// Should print something like
//     Max Severity: Safe spec violation(1).
//     414 Apparently fine
//     24 Deleted
//     1 Skipped
//     Max Severity: Safe spec violation(1).
//     initSES succeeded.
//    hi

var unsafeEval = eval;
var global = this;

var FS = require("fs");
var src = '';
[
    "logger.js",
    "repairES5.js",
    "WeakMap.js",
    "debug.js",
    "StringMap.js",
    "whitelist.js",
    "atLeastFreeVarNames.js",
    "startSES.js",
    "ejectorsGuardsTrademarks.js",
    "hookupSESPlus.js",
].forEach(function (path) {
    console.log("Running: " + path);
    src += FS.readFileSync(path);
});

unsafeEval(src);

global.cajaVM.eval("console.log('hi');");
console.log(global);
console.log(Object.getOwnPropertyNames(global).sort().join('\n'));
