document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal-content');
    const commandInput = document.getElementById('command-input');
    
    // Command database
    const commands = {
      help: function() {
        return `
  <div class="command-output">
  Available commands:
    <span class="command">help</span>      - Show this help message
    <span class="command">about</span>     - Learn about me
    <span class="command">skills</span>    - View my technical skills
    <span class="command">projects</span>  - Browse my portfolio projects
    <span class="command">contact</span>   - Find my contact information
    <span class="command">clear</span>     - Clear the terminal
    <span class="command">github</span>    - Open my GitHub profile
  </div>`;
      },
      
      about: function() {
        return `
  <div class="command-output">
  About Me:
  -----------------------------------------
  I am a passionate developer with a focus on creating 
  intuitive and efficient web applications. My journey 
  in programming began with a fascination for solving 
  problems and has evolved into a career building 
  digital experiences.
  
  When I'm not coding, I enjoy brewing late-night coffee 
  and exploring new technologies.
  </div>`;
      },
      
      skills: function() {
        return `
  <div class="command-output">
  Technical Skills:
  -----------------------------------------
  • Frontend: HTML, CSS, JavaScript, React
  • Backend: Node.js, Express, MongoDB
  • Tools: Git, Docker, VS Code
  • Cloud: AWS, Heroku, Netlify
  • Other: RESTful APIs, GraphQL, Responsive Design
  </div>`;
      },
      
      projects: function() {
        return `
  <div class="command-output">
  Portfolio Projects:
  -----------------------------------------
  1. <span class="command">Coffee at Night</span> - A website for night-time coffee enthusiasts
     Tech: HTML, CSS, Node.js, Express
  
  2. <span class="command">Terminal Portfolio</span> - This website you're viewing right now
     Tech: Node.js, HTML, CSS, JavaScript
  
  3. <span class="command">Task Manager API</span> - RESTful API for managing tasks
     Tech: Node.js, Express, MongoDB
  
  Type <span class="command">projects [number]</span> for details about a specific project.
  </div>`;
      },
      
      contact: function() {
        return `
  <div class="command-output">
  Contact Information:
  -----------------------------------------
  • Email: yourname@example.com
  • GitHub: github.com/yourusername
  • LinkedIn: linkedin.com/in/yourprofile
  • Phone: +855 93-339-938
  </div>`;
      },
      
      github: function() {
        window.open('https://github.com/yourusername', '_blank');
        return `<div class="command-output">Opening GitHub profile...</div>`;
      },
      
      clear: function() {
        return 'clear';
      }
    };
    
    // Handle commands
    function handleCommand(cmd) {
      cmd = cmd.trim().toLowerCase();
      
      // Handle empty commands
      if (cmd === '') {
        return '';
      }
      
      // Split command and arguments
      const cmdParts = cmd.split(' ');
      const baseCmd = cmdParts[0];
      const args = cmdParts.slice(1);
      
      // Check if command exists
      if (commands.hasOwnProperty(baseCmd)) {
        // Handle special case for projects with number
        if (baseCmd === 'projects' && args.length > 0) {
          const projectNumber = parseInt(args[0]);
          if (!isNaN(projectNumber)) {
            switch(projectNumber) {
              case 1:
                return `
  <div class="command-output">
  Project: Coffee at Night
  -----------------------------------------
  A responsive website for a fictional coffee shop that specializes
  in late-night coffee experiences. Features a dark-themed UI and
  showcases specialty coffee drinks.
  
  • GitHub: github.com/yourusername/coffee-at-night
  • Live Demo: coffeenight-demo.example.com
  </div>`;
              case 2:
                return `
  <div class="command-output">
  Project: Terminal Portfolio
  -----------------------------------------
  An interactive terminal-themed portfolio website that mimics a command-line
  interface. Users can type commands to navigate and view information about me.
  
  • GitHub: github.com/yourusername/terminal-portfolio
  • Live Demo: You're looking at it!
  </div>`;
              case 3:
                return `
  <div class="command-output">
  Project: Task Manager API
  -----------------------------------------
  A RESTful API built with Node.js and Express that allows users to create,
  read, update, and delete tasks. Features authentication and user accounts.
  
  • GitHub: github.com/yourusername/task-manager-api
  • Documentation: api-docs.example.com
  </div>`;
              default:
                return `<div class="command-output error">Project ${projectNumber} not found. Type <span class="command">projects</span> to see available projects.</div>`;
            }
          }
        }
        
        return commands[baseCmd]();
      } else {
        return `<div class="command-output error">Command not found: ${cmd}. Type <span class="command">help</span> for available commands.</div>`;
      }
    }
    
    // Add a new line to the terminal
    function addNewLine(output = '') {
      // If command is clear, clear the terminal
      if (output === 'clear') {
        // Keep only the intro
        terminal.innerHTML = '';
        const intro = document.createElement('div');
        intro.className = 'intro';
        intro.innerHTML = `<pre class="ascii-art">
   _______ _______ ______ ___ ___ ___ __   _  ___  _     
   |______ |______ |_____  |   |   |  | \  | |___ | |    
   |______ |______ |_____  |  _|_ _|_ |  \_| |___ |_|___ 
                                                         
  </pre>
        <p>Welcome to my terminal portfolio! Type <span class="command">help</span> to see available commands.</p>`;
        terminal.appendChild(intro);
      } else if (output) {
        const outputDiv = document.createElement('div');
        outputDiv.innerHTML = output;
        terminal.appendChild(outputDiv);
      }
      
      // Create new command line
      const newLine = document.createElement('div');
      newLine.className = 'terminal-line';
      
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = 'user@portfolio:~$';
      
      const input = document.createElement('span');
      input.className = 'command-input';
      input.contentEditable = true;
      input.id = 'command-input';
      
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      
      newLine.appendChild(prompt);
      newLine.appendChild(input);
      newLine.appendChild(cursor);
      terminal.appendChild(newLine);
      
      // Focus on the new input
      input.focus();
      
      // Scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;
      
      // Add event listener to the new input
      setupInputListeners(input);
    }
    
    // Set up event listeners for the input
    function setupInputListeners(inputElement) {
      inputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          
          // Get command
          const command = this.textContent;
          
          // Make the input non-editable
          this.contentEditable = false;
          
          // Remove cursor from current line
          const cursor = this.parentNode.querySelector('.cursor');
          if (cursor) cursor.remove();
          
          // Process command and add output
          const output = handleCommand(command);
          
          // Add new line with new input
          setTimeout(() => {
            addNewLine(output);
          }, 100);
        }
      });
      
      // Prevent pasting formatted text
      inputElement.addEventListener('paste', function(e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    }
  
    // Initialize the terminal
    setupInputListeners(commandInput);
    
    // Focus the input when clicking anywhere in the terminal
    terminal.addEventListener('click', function(e) {
      const activeInput = document.getElementById('command-input');
      if (activeInput) {
        activeInput.focus();
        
        // Place cursor at the end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(activeInput);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
  });