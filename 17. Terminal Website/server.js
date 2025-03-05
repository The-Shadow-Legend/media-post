const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic API endpoint for commands
app.get('/api/commands', (req, res) => {
  const commands = [
    { name: 'help', description: 'List all available commands' },
    { name: 'about', description: 'Learn about me' },
    { name: 'skills', description: 'View my technical skills' },
    { name: 'projects', description: 'Browse my portfolio projects' },
    { name: 'contact', description: 'Find my contact information' },
    { name: 'clear', description: 'Clear the terminal' },
  ];
  
  res.json(commands);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});