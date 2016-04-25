# reqly react
React helper to quickly run a server with Babelify and react hot-loader

# example
```javascript
// Local dependencies
var server = require('reqly-react');

// Create server
server.connect(3333, {
  input: ["./dist/example.jsx", "./src/index.jsx"],
  output: "./dist/index.jsx"
});

// Create socket server
server.socket('/', 8080);
// Read RFC-6455 standard for implementation      
```

