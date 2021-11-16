import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../domain/appconfig';
import { AppConfigService } from '../service/appconfigservice';
import { VersionService } from '../service/versionservice';
import { SessaoService } from 'src/app/service/sessao.service';
import { UsuarioLogado } from '../../model/usuario-logado';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {

    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    public usuarioLogado: UsuarioLogado;
    public isLogado: boolean;

    constructor(
        private router: Router,
        public sessaoService: SessaoService,
    ) { }

    ngOnInit() {
        this.sessaoService.recuperarUsuarioLogado().then(retorno => {
            this.usuarioLogado = retorno;
        }, () => {
            console.log('ERRO');
        });

        this.sessaoService.isLogado().then(retorno => {
            this.isLogado = retorno;
        }, () => {
            console.log('ERRO');
        });
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick.emit();
        event.preventDefault();
    }

    toHome() {
        this.router.navigate(['/home']);
    }

    logout() {
        this.sessaoService.sair();
    }

    entrar() {
        this.router.navigate(['/home-login']);
    }

}
