require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;

// ================= CONNECT MONGODB =================


const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    console.log("📡 DB URL (masked):", process.env.DB_URL?.replace(/:.+@/, ':****@'));

    await mongoose.connect(process.env.DB_URL);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error("🔴 Error Name:", error.name);
    console.error("🔴 Error Message:", error.message);

    // extra debug info
    if (error.reason) {
      console.error("🧠 Reason:", error.reason);
    }

    process.exit(1); // stop server so you clearly see failure
  }
};

connectDB();

// ================= USER MODEL =================
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// ================ SIGNUP ====================

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== LOGIN ======================

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================ PROTECTED ROUTE ================
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user,
  });
});























// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// const SECRET = 'mysecret';

// // Fake DB
// let users = [];

// /* ================= SIGNUP ================= */
// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   // check duplicate
//   const existing = users.find(u => u.username === username);
//   if (existing) {
//     return res.status(400).send('User already exists');
//   }

//   users.push({ username, password });

//   res.send('User created');
// });

// /* ================= LOGIN ================= */
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(u => u.username === username);

//   if (!user) return res.status(400).send('User not found');

//   if (user.password !== password) {
//     return res.status(400).send('Wrong password');
//   }

//   const token = jwt.sign(
//     { username },
//     SECRET,
//     { expiresIn: '1h' } // ⏱ session-like behavior
//   );

//   res.json({ token });
// });

// /* ================= PROTECTED ROUTE ================= */
// app.get('/profile', (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) return res.status(401).send('No token');

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     res.json({ message: 'Access granted', user: decoded });
//   } catch {
//     res.status(401).send('Invalid token');
//   }
// });

// /* ================= SERVER ================= */
// app.listen(3000, '0.0.0.0', () => {
//   console.log('Server running on http://192.168.1.93:3000');
// });