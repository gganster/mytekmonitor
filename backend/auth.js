const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require("./env.js");


function create_auth(app){
  app.use(bodyParser.json());

  app.get('/api/auth', (req, res) => {
      res.status(200);
      res.send("Welcome to root URL of auth");
  });

  app.post("/api/auth/login", (req, res) => {
    const {mail, password} = req.body;

    const user = config.users.find(user => user.username === mail);

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({mail}, config.secret, {expiresIn: '48h'});
        res.status(200);
        res.json({token});
      } else {
        res.status(401);
        res.send("User not found or incorrect password");
      }
    } else {
      res.status(401);
      res.send("User not found or incorrect password");
    }
  });

  app.get("/api/auth/verify", (req, res) => {
    const {authorization} = req.headers;

    try {
      const decoded = jwt.verify(authorization, config.secret);
      res.status(200);
      res.json({decoded});
    } catch (err) {
      res.status(401);
      res.send("Invalid token");
    }
  });
}

module.exports = create_auth;