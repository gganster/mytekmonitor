
let config = require("./env");

function create_api(app){
    app.get('/api', (req, res) => {
        res.status(200);
        res.send("Welcome to root URL of Api");
    });

    app.get("/api/instances", (req, res) => {
    res.status(200);
    res.json(config.instances);
    })
}

module.exports = create_api;