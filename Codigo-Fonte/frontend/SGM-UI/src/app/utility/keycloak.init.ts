import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: environment.useHerokuKeycloak ? environment.keycloakHeroku.url_keycloack : environment.keycloak.url_keycloack,
                realm: environment.useHerokuKeycloak ? environment.keycloakHeroku.realm : environment.keycloak.realm,
                clientId: environment.useHerokuKeycloak ? environment.keycloakHeroku.clientId : environment.keycloak.clientId
            },
            loadUserProfileAtStartUp: false,
            initOptions: {
                onLoad: 'check-sso',
                checkLoginIframe: true
            },
            bearerExcludedUrls: ['/assets','/home'],
        });
}