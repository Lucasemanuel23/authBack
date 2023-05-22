// npm install mongoose express body-parser jsonwebtoken bcrypt

module.exports = mongoose.model('User', UserSchema);

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
