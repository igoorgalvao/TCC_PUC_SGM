
export const environment = {
  production: true,
  useHerokuKeycloak: true,
  useHerokubackend: true,
  server: false,
  local: true,
  envName: 'loc',
  urlbackend: 'http://localhost',
  urlHome: 'https://tcc-angular-ui.herokuapp.com/#/home',

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
