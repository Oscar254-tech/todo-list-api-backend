const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults(); // Fixed spelling

// Enhanced CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Proper middleware usage
server.use(middlewares); // Corrected variable name
server.use(router);

// Working root redirect
server.get('/', (req, res) => {
  res.redirect('/tasks');
});

const PORT = 5000; // Consistent port usage
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
});