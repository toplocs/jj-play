const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('./config');

const app = express();
const port = 4000;

app.use(express.json());

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  if (config.useExternalIDP) {
    try {
      const response = await axios.get(config.externalIDPConfig.userInfoUrl, {
        headers: { Authorization: token }
      });
      req.user = response.data;
      next();
    } catch (err) {
      return res.sendStatus(403);
    }
  } else {
    jwt.verify(token, config.secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
};

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
