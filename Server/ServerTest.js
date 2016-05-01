//Runs the test through qunit.
var testrunner = require("../node_modules/qunit");

testrunner.run({
    code: "server.js",
    tests: "tests.js"
});
