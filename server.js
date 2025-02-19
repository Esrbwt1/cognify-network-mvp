// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// Middleware to parse JSON bodies
app.use(express.json());

// Simulated AI Pre-Validation Function
function simulateAIValidation(task) {
    // Basic criteria: task must be at least 10 characters and contain at least one punctuation mark
    const minLength = 10;
    const punctuationRegex = /[.,!?;]/;
  
    if (task.length < minLength) {
      return { valid: false, reason: "Task is too short. Please provide more details." };
    }
    if (!punctuationRegex.test(task)) {
      return { valid: false, reason: "Task should include punctuation for clarity." };
    }
    // If all checks pass, consider it valid
    return { valid: true };
  }
  

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
    
    // Simulated AI Pre-Validation Check
    const validationResult = simulateAIValidation(task);
    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.reason });
    }
    
    // Create a new task object if validation passes
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