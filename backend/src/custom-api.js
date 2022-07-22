//path 

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/articles/customRoute', //apiURl ?
        handler: 'controllerName.actionName', //localhost:3000.fetch_data() ?
        config: {
          auth: false,
        },
      },
    ],
  };