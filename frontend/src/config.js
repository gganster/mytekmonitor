
const config = {
  lang: "fr",
  driver: "strapi", //["firebase", "strapi"]
  strapi: {
    apiUrl: "http://localhost:1337",
  },
  glancesInstance: [{label: "serveur1", value: "url1"}, {label: "serveur2", value: "url1"}],
  debug: true,
}

export default config;