
const config = {
  lang: "fr",
  driver: "strapi", //["firebase", "strapi"]
  strapi: {
    apiUrl: "http://localhost:1337",
  },
  glancesInstance: [{label: "serveur1", value: "http://preprod.assocampus.fr:61208"}, {label: "serveur2", value: "http://preprod.assocampus.fr:61208"}],
  debug: true,
}

export default config;