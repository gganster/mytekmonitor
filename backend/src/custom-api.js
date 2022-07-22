//path 

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/articles/customRoute', //apiURl ?
        handler: 'controllerName.actionName',
        config: {
          auth: false,
        },
      },
    ],
  };