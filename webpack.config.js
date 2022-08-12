const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "juststreamit.bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};