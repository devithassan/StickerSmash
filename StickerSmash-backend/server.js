const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = 'mysecret';

// Fake DB
let users = [];

/* ================= SIGNUP ================= */
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // check duplicate
  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(400).send('User already exists');
  }

  users.push({ username, password });

  res.send('User created');
});

/* ================= LOGIN ================= */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) return res.status(400).send('User not found');

  if (user.password !== password) {
    return res.status(400).send('Wrong password');
  }

  const token = jwt.sign(
    { username },
    SECRET,
    { expiresIn: '1h' } // ⏱ session-like behavior
  );

  res.json({ token });
});

/* ================= PROTECTED ROUTE ================= */
app.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send('No token');

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: 'Access granted', user: decoded });
  } catch {
    res.status(401).send('Invalid token');
  }
});

/* ================= SERVER ================= */
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://192.168.1.42:3000');
});