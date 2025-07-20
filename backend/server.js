const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enhanced CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Middleware
server.use(middlewares);
server.use(router);

// Root redirect
server.get('/', (req, res) => {
  res.redirect('/tasks');
});

// Use Render's dynamic port or fallback to 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n Server running on port ${PORT}`);
});
