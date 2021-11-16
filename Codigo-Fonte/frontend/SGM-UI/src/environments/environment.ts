
export const environment = {
  production: false,
  useHerokuKeycloak: false,
  useHerokubackend: false,
  server: false,
  local: true,
  envName: 'loc',
  urlbackend: 'http://localhost',
  urlHome: 'http://localhost:4200/#/home',

  keycloak: {
    url_keycloack: 'http://localhost:8080/auth/',
    realm: 'SGM',
    clientId: 'sgm-ui'
  },

  keycloakHeroku: {
    url_keycloack: 'https://sgm-keycloak-pucminas.herokuapp.com/auth/',
    realm: 'SGM',
    clientId: 'sgm-ui'
  }
};
