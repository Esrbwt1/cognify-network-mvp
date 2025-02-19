// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// Middleware to parse JSON bodies
app.use(express.json());


// A simple test route
app.get('/', (req, res) => {
  res.send('Welcome to Cognify Network MVP!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});