//path 
const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports (apiUrl) = {
    routes: [
      {
        method: 'GET',
        path: `/${apiUrl}`, //apiUrl http://.../api/v3/...
        handler: `//localhost:3000.fetch_data(${apiUrl})`, //localhost:3000.fetch_data() ? useData ?
        config: {
          auth: false,
        },
      },
    ],
  };