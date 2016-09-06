module.exports = function (name) {
    return {
        header: '\n' +
        "(function () {\n" +
        "    var _detectedModuleType;\n" +
        "    if (typeof define === 'function' && define.amd) {\n" +
        "        _detectedModuleType = 'RequireJS';\n" +
        "    }\n" +
        "    else if (typeof module === 'object' && module.exports) {\n" +
        "        _detectedModuleType = 'CommonJS';\n" +
        "    }\n" +
        "    else if (typeof window !== 'undefined') {\n" +
        "        _detectedModuleType = 'Browser';\n" +
        "    }\n" +
        "    else {\n" +
        "        throw 'Error: No browser or module system detected!';\n" +
        "    }\n" +
        "    var " + name + " = {};\n",
        footer: '\n' +
        "    switch (_detectedModuleType) {\n" +
        "        case 'RequireJS':\n" +
        "            define(['" + name + "'], " + name + ");\n" +
        "            break;\n" +
        "        case 'CommonJS':\n" +
        "            module.exports = " + name + ";\n" +
        "            break;\n" +
        "        case 'Browser':\n" +
        "            window." + name + " = " + name + ";\n" +
        "            break;\n" +
        "   }\n" +
        "})();"
    };
};