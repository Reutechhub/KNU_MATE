const jwt = require('jsonwebtoken');

// Dummy user store (replace with real DB later)
const users = [];

// Seed a default admin for development/testing (username: admin, password: Admin@123)
// NOTE: This is in-memory and only for local development. Remove or secure before production.
users.push({ id: 1, username: 'admin', password: 'Admin@123', role: 'admin' });

// Register controller
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const newUser = { id: users.length + 1, username, password, role };
  users.push(newUser);

  res.status(201).json({ message: 'User registered', user: newUser });
};

// Login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Return token and a safe user object (no password)
  const safeUser = { id: user.id, username: user.username, role: user.role };
  res.json({ message: 'Login successful', token, user: safeUser });
};
