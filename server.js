const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS (essential for frontend connections)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Apply middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);  // Required for POST/PATCH requests
server.use(router);

// Critical Render configuration
const port = process.env.PORT || 3000;  // Render will provide PORT automatically
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Access via: http://localhost:${port}`);  // For local testing
});