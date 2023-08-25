const express = require('express');
const app = express();
const db = require('./database');
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post('/users', (req, res) => {
     const { username, email, password } = req.body;

     db.run(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, password],
          (err) => {
               if (err) {
                    res.status(500).send(err.message);
                    return;
               }
               res.send('User added successfully');
          }
     );
});

app.get('/users', (req, res) => {
     db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
               res.status(500).send(err.message);
               return;
          }
          res.send(rows);
     });
});

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
