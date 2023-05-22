// server.js

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user');
// Configurações de banco de dados
mongoose.connect('mongodb://localhost/auth-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.json());
// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }
  const token = jwt.sign({ id: user._id }, 'secret-key');
  res.json({ token });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
