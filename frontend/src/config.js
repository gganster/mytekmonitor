
const config = {
  lang: "fr",
  driver: "strapi", //["firebase", "strapi"]
  strapi: {
    apiUrl: "http://localhost:1337",
  },
  glancesInstance: [{name: "serveur1", url: "url1"}, {name: "serveur2", url: "url1"}],
  debug: true,
}

export default config;