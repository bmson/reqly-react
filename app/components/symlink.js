// Global dependencies
const path = require('path');
const fs   = require('fs');

// Local dependencies
const helpers = require('./helpers');

// Module definition
module.exports = (url, name, modules = './node_modules/') => {

    // Split name
    const { filepath, filename } = helpers.splitPath(name);
    const modulePath = path.join(modules, filepath);

    // Create directory
    fs.existsSync(modulePath) || fs.mkdir(modulePath);

    // Get path of application relative to modules
    const main = path.relative(modulePath, url);

    // Create a symlink
    fs.symlink(main, path.join(modules, filepath, filename), e => {});

}
