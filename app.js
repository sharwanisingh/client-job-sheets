const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/search-client', (req, res) => {

  const clientId = req.body.clientId;
  db.get(`SELECT * FROM clients WHERE id = ?`, clientId, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error searching for client' });
    } else if (!row) {
      res.send({ message: 'Client not found' });
    } else {
      res.send(row);
    }
  });
});

// Configure static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Route for the main dashboard
app.get('/', (req, res) => {
  db.all('SELECT * FROM clients', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.render('index', { clients: [] });
    } else {
      console.log('Clients:', rows); // Check if rows are being retrieved correctly
      res.render('index', { clients: rows });
    }
  });
});

// Route for adding a new client
app.get('/new', (req, res) => {
  res.render('new');
});
  // Insert into the database
  db.run(
    'INSERT INTO clients (client_name, contact_info, ...) VALUES (?, ?, ...)',
    [clientName, contactInfo,],

    (err) => {
      if (err) {
        console.error(err.message);
        res.redirect('/new'); // Or send an error message
      } else {
        res.redirect('/'); // Redirect back to the dashboard
      }
    }
  );


// Other routes (for editing, deleting, etc.)

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Close the database connection when the server shuts down
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Closed the database connection.');
    }
    process.exit(0);
  });
});


  // Insert into the database
  db.run(
    'INSERT INTO clients (client_name, contact_info) VALUES (?, ?)',
    [clientName, contactInfo],
    (err) => {
      if (err) {
        console.error(err.message);
        res.redirect('/new');
      } else {
        res.redirect('/');
      }
    }
  );
app.get('/delete/:id', (req, res) => {
  const clientId = req.params.id;
  db.run('DELETE FROM clients WHERE id = ?', clientId, (err) => {
      if (err) {
          return res.status(500).send('Error deleting client');
      }
      res.redirect('/'); // Redirect after deletion
  });
});
app.post('/new', (req, res) => {
  const { clientName, contactInfo, receivedDate, inventoryReceived, reportedIssues, clientNotes, assignedTechnician, estimatedAmount, deadline } = req.body;
  
  // Insert into the database logic here...
  
  res.redirect('/'); // Redirect after successful creation
});
