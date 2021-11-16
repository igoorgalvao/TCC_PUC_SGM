import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { AppConfig } from './shared/template/domain/appconfig';
import { AppConfigService } from './shared/template/service/appconfigservice';
import { TranslateService } from '@ngx-translate/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  menuActive: boolean;

  newsActive: boolean = true;

  config: AppConfig;

  news_key = 'primenews';

  theme: string = "saga-blue";

  public subscription: Subscription;

  public language = 'pt-br'

  constructor(
    private router: Router,
    private configService: AppConfigService,
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService) {
  }


  ngOnInit() {
    this.primengConfig.ripple = true;
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      localStorage.setItem('primeng-theme', this.config.theme);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideMenu();
      }

      this.translateService.setDefaultLang(this.language);
    });

    this.newsActive = this.newsActive && this.isNewsStorageExpired();

    let appTheme;
    const queryString = window.location.search;

    if (queryString)
      appTheme = new URLSearchParams(queryString.substring(1)).get('theme');
    else
      appTheme = localStorage.getItem('primeng-theme');

    if (appTheme) {
      let darkTheme = this.isDarkTheme(appTheme);
    }
  }

  ngAfterViewInit() {
    this.translateService.use(this.language);
    this.translateService
      .get('primeng')
      .subscribe(res => this.primengConfig.setTranslation(res));
  }


  onMenuButtonClick() {
    this.menuActive = true;
    this.addClass(document.body, 'blocked-scroll');
  }

  onMaskClick() {
    this.hideMenu();
  }

  hideMenu() {
    this.menuActive = false;
    this.removeClass(document.body, 'blocked-scroll');
  }

  addClass(element: any, className: string) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }

  removeClass(element: any, className: string) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  hideNews() {
    this.newsActive = false;
    const now = new Date();
    const item = {
      value: false,
      expiry: now.getTime() + 604800000,
    }
    localStorage.setItem(this.news_key, JSON.stringify(item));
  }

  isNewsStorageExpired() {
    const newsString = localStorage.getItem(this.news_key);
    if (!newsString) {
      return true;
    }
    const newsItem = JSON.parse(newsString);
    const now = new Date()

    if (now.getTime() > newsItem.expiry) {
      localStorage.removeItem(this.news_key);
      return true;
    }

    return false;
  }

  // changeTheme(event) {
  // let themeElement = document.getElementById('theme-link');
  // themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.theme, event.theme));
  // this.theme = event.theme;

  // this.config.dark = event.dark;
  // this.config.theme = this.theme;
  // this.configService.updateConfig(this.config);

  // if (event.theme.startsWith('md')) {
  //   this.config.ripple = true;
  // }

  // if (this.config.theme === 'nano')
  //   this.applyScale(12);

  // }

  isDarkTheme(theme) {
    return theme.indexOf('dark') !== -1 || theme.indexOf('vela') !== -1 || theme.indexOf('arya') !== -1 || theme.indexOf('luna') !== -1;
  }

  applyScale(scale: number) {
    document.documentElement.style.fontSize = scale + 'px';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
