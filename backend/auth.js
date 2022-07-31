
function create_auth(app){
  app.get('/auth', (req, res) => {
      res.status(200);
      res.send("Welcome to root URL of auth");
  });
}

module.exports = create_auth;