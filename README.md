# route66

A very minimalistic HTTP routing library for Sibilant (also usable in Node.js).

## Usage

The idea of Route66 is that, in typical LISP fashion, routes are data. Each route is a combination of
a regular expression and a HTTP handler function to dispatch to, which takes (http-request, http-response)
parameters. 

A call to route66.create-dispatcher with the routes and a fallback 'not-found' handler (that is used if no matches are found) returns a dispatch function that when called with (url) returns the first matched handler function (or the not found handler). A simple example is provided below:

The code is just 44 lines, so any questions: just read the source.

```clojure
;; Imports
(var http (require 'http)
     route66 (require "@gowerstreet/route66"))

;; Constants
(var PORT 8000)

(def home (req res)
  (res.write-head 200 {"Content-Type" "text/plain"})
  (res.end "You're home now, sigh."))

(def cats (req res)
  (res.write-head 200 {"Content-Type" "application/json"})
  (res.end (JSON.stringify [["British shorthair" "https://en.wikipedia.org/wiki/British_Shorthair"]
                            ["Somali"            "https://en.wikipedia.org/wiki/Somali_cat"]
                            ["Abyssinian"        "https://en.wikipedia.org/wiki/Abyssinian_cat"]
                            ["Maine Coon"        "https://en.wikipedia.org/wiki/Maine_Coon"]])))

(def not-found (res)
  (res.write-head 404 {"Content-Type" "text/plain"})
  (res.end "404 Not found\n"))

(var routes [["GET /cats" cats]
             ["GET /"     home]]
     dispatcher (route66.create-dispatcher routes not-found))

(def handler (req res)
  (var dispatch-to (dispatcher (+ req.method " " req.url)))
  (console.log "request:" (.toISOString (new Date)) req.method req.url)
  (dispatch-to req res))

(pipe
  (http.create-server handler)
  (.listen PORT "0.0.0.0"))

(console.log "Server listening on port" PORT)
```

## License

MIT - see the [license file](LICENSE).
