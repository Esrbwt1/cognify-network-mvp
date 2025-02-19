// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for tasks (for MVP purposes)
const tasks = [];


// A simple test route
app.get('/', (req, res) => {
  res.send('Welcome to Cognify Network MVP!');
});


// API route to handle task submissions
app.post('/api/tasks', (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === "") {
      return res.status(400).json({ error: 'Task content is required.' });
    }
    // Create a new task object
    const newTask = {
      id: tasks.length + 1,
      task: task,
      timestamp: new Date()
    };
    tasks.push(newTask);
    return res.status(200).json({ message: 'Task added successfully', task: newTask });
  });

// API route to get all tasks (for testing purposes)
app.get('/api/tasks', (req, res) => {
    res.status(200).json({ tasks });
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});