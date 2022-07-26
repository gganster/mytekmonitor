module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/glances',
     handler: 'glances.getGlance',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
