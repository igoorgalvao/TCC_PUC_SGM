import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';
import { SessaoService } from '../service/sessao.service';

@Injectable({
    providedIn: 'root'
})
export class PermissaoGuard implements CanActivate, CanActivateChild, CanLoad {


    constructor(
        private sessaoService: SessaoService,
        private messageService: MessageService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.verificarPermissao(route);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.sessaoService.verificarAutenticacao();
    }


    private verificarPermissao(route: ActivatedRouteSnapshot): boolean {
        if (!this.sessaoService.verificarAutenticacao()) {
            return false;
        }

        // Verifica se o perfil tem acesso a tela
        let acesso = route.data["acesso"];

        /* Se a variavel tela estiver preenchida a função foi ativada e deve ser verificada */
        if (acesso) {

            this.sessaoService.recuperarUsuarioLogado().then(usuario => {
                let temPermissao = usuario.roles.some(t => acesso == t);

                if (!temPermissao) {
                    this.messageService.add({ severity: 'error', summary: 'Acesso Negado', detail: 'Você não possui permissão para acessar esta funcionalidade.' });
                    this.sessaoService.rotearParaHome();
                    return false;
                }

                return true;
            });
        }

        return true;
    }

}
