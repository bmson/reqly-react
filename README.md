# reqly react
React helper to quickly run a server with Babelify and react hot-loader

# build development
```javascript
// Dependencies
var reqly = require('reqly-react');

// Create webpack server with live-reload
reqly.server(3333, {
  input: ["./example/index.jsx", "./src/index.jsx"],
  output: "./example/bundle.js"
});

// Create a symlink to use in your example application
// Then you can require your app in your ./example/index.jsx such " import myApp from 'my-app' "
reqly.symlink('./src/', 'my-app');

// Create socket server
reqly.socket('/', 8080);
// Read RFC-6455 standard for implementation      
```

# build production
```javascript
// Dependencies
var reqly = require('reqly-react');

// Compile source code and export
reqly.connect(3333, {
  input: ["./src/example.jsx"],
  main: "./dist/bunld.js"
});
```
