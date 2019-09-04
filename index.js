var assert = require("assert");
var DEBUG = (process.env.DEBUG || false);
var log = (function log$() {
  /* log route66.sibilant:6:0 */

  return (function() {
    if (DEBUG) {
      return console.log.apply(this, arguments);
    }
  }).call(this);
});
var matches = (function matches$(routes, url) {
  /* matches route66.sibilant:8:0 */

  assert.ok((routes && "object" === typeof routes && "Array" === routes.constructor.name), "Routes must be an array of (reqexp handler-fn) tuples");
  assert.ok(typeof url === "string", "URL must be a string");
  var matching = routes.filter((function(x) {
    /* route66.sibilant:16:25 */

    return (typeof url.match((new RegExp(("^" + x[0] + "$"), undefined))) !== "undefined" && url.match((new RegExp(("^" + x[0] + "$"), undefined))) !== null);
  })),
      match = (function() {
    if (0 === matching.length) {
      return null;
    } else {
      return matching[0];
    }
  }).call(this);
  return match;
});
var createDispatcher = (function createDispatcher$(routes, notFound) {
  /* create-dispatcher route66.sibilant:23:0 */

  return (function(url) {
    /* route66.sibilant:24:2 */

    assert.ok((routes && "object" === typeof routes && "Array" === routes.constructor.name), "Routes must be an array of (reqexp handler-fn) tuples");
    assert.ok(typeof notFound === "function", "The 404 handler must be a function");
    return (function() {
      if (0 === routes.length) {
        return notFound;
      } else {
        var match = matches(routes, url);
        log("match", match, "for", url);
        return (function() {
          if (((typeof match !== "undefined" && match !== null) && !(0 === match.length))) {
            return match[1];
          } else {
            return notFound;
          }
        }).call(this);
      }
    }).call(this);
  });
});
module.exports = {
  "matches": matches,
  "createDispatcher": createDispatcher
};
