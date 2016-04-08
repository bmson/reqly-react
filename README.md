# reqly react
React helper to quickly run a server with Babelify and react hot-loader

# example
```javascript
// Local dependencies
var server = require('reqly-react');

// Create server
server.connect(3333, {
  privatePath: "/src",
  privateFile: "index.jsx",

  publicPath: "/build",
  publicFile: "bundle.js"
});      
```

