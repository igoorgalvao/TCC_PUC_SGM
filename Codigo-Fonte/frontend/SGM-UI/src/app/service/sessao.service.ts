import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import * as Keycloak from 'keycloak-js';
import { environment } from 'src/environments/environment';
import { UsuarioLogado } from '../shared/model/usuario-logado';


@Injectable({
    providedIn: 'root'
})
export class SessaoService {

    public isLoggedIn = false;
    public userProfile: Keycloak.KeycloakProfile;


    constructor(
        protected keycloak: KeycloakService,
        private router: Router,
    ) {
    }

    async recuperarUsuarioLogado(): Promise<UsuarioLogado> {
        this.isLoggedIn = await this.keycloak.isLoggedIn();

        if (this.isLoggedIn) {
            this.userProfile = await this.keycloak.loadUserProfile();
            return this.criarUsuario(this.userProfile);
        }

        return new UsuarioLogado();
    }

    public async isLogado() {
        return await this.keycloak.isLoggedIn();

    }

    public possuiPermissaoTelas(roles: string[]): boolean {

        let rolesTemAcesso = this.keycloak.getKeycloakInstance().realmAccess?.roles;
        let temPermissao = rolesTemAcesso?.some(p => roles.includes(p));

        if (temPermissao) {
            return true;
        } else {
            return false;
        }
    }

    sair() {
        this.keycloak.logout(environment.urlHome);

    }

    private criarUsuario(usuKey: Keycloak.KeycloakProfile): UsuarioLogado {
        let usu: UsuarioLogado = new UsuarioLogado();
        usu.primeiroNome = usuKey.firstName;
        usu.sobrenome = usuKey.lastName;
        usu.email = usuKey.email;
        usu.roles = this.keycloak.getKeycloakInstance().realmAccess?.roles;
        return usu;
    }

    public verificarAutenticacao(): boolean {
        if (!this.isLogado()) {
            this.sair();
            return false;
        }
        return true;
    }

    public rotearParaHome() {
        console.log('Redirecionando para o home ...');
        this.router.navigate(['/home']);
    }


}