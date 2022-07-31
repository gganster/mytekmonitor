
function create_api(app){
      app.get('/api', (req, res) => {
          res.status(200);
          res.send("Welcome to root URL of Api");
      }
    );
}

module.exports = create_api;