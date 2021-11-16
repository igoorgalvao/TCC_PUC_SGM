import { Component, ElementRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { AppConfig } from '../domain/appconfig';
import { AppConfigService } from '../service/appconfigservice';
import { SessaoService } from 'src/app/service/sessao.service';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent {

    @Input() active: boolean;

    activeSubmenus: { [key: string]: boolean } = {};

    filteredRoutes: any[];

    selectedRoute: any;

    submenuRouting: boolean;

    scrollable = true;

    config: AppConfig;

    subscription: Subscription;

    public isLogado: boolean;

    constructor(private el: ElementRef,
        private router: Router,
        private filterService: FilterService,
        private configService: AppConfigService,
        public sessaoService: SessaoService,) {

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
        router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationStart && (routerEvent.navigationTrigger === "popstate" || this.scrollable)) {
                let routeUrl = routerEvent.url;

                if (this.isSubmenu(routeUrl) && !this.isSubmenuActive('/' + routeUrl.split('/')[1])) {
                    this.submenuRouting = true;
                }

                if (routerEvent.navigationTrigger === "popstate") {
                    this.scrollable = true;
                }
            }

            if (routerEvent instanceof NavigationEnd && !this.submenuRouting && this.scrollable) {
                setTimeout(() => {
                    this.scrollToSelectedRoute();
                }, 1);
            }
        });
    }

    ngOnInit() {
        this.sessaoService.isLogado().then(retorno => {
            this.isLogado = retorno;
        }, () => {
            console.log('ERRO');
        });
    }


    onSelect(event) {
        if (this.router.url !== event.value) {
            this.scrollable = true;
            this.router.navigate([event.value]);
        }

        this.selectedRoute = null;
    }

    onAnimationDone() {
        if (this.submenuRouting) {
            this.scrollToSelectedRoute();
            this.submenuRouting = false;
        }
    }

    scrollToSelectedRoute() {
        let routeEl = DomHandler.findSingle(this.el.nativeElement, '.router-link-exact-active');

        if (routeEl)
            routeEl.scrollIntoView({ inline: 'start' });

        this.scrollable = false;
    }

    toggleSubmenu(event: Event, name: string) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false : true;
        event.preventDefault();
    }

    isSubmenu(route) {
        return route.includes('table') || route.includes('treetable') || route.includes('tree') || route.includes('galleria');
    }

    isSubmenuActive(name: string) {
        if (this.activeSubmenus.hasOwnProperty(name)) {
            return this.activeSubmenus[name];
        }
        else if (this.router.isActive(name, false)) {
            this.activeSubmenus[name] = true;
            return true;
        }

        return false;
    }
}
