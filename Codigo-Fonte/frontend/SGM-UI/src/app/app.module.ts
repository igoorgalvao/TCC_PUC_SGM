import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DirectivesModule } from './shared/directives/directives.module';
import { AppConfigComponent } from './shared/template/appconfig/app.config.component';
import { AppFooterComponent } from './shared/template/footer/app.footer.component';
import { AppMenuComponent } from './shared/template/menu/app.menu.component';
import { AppConfigService } from './shared/template/service/appconfigservice';
import { VersionService } from './shared/template/service/versionservice';
import { AppTopBarComponent } from './shared/template/topbar/app.topbar.component';
import { AuthGuard } from './utility/auth.guard';
import { initializeKeycloak } from './utility/keycloak.init';
import { PermissaoGuard } from './utility/permissao.guard';


registerLocaleData(localePt);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppConfigComponent,
    AppFooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ButtonModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    AvatarModule,
    CardModule,
    PanelModule,
    ToastModule,
    MessageModule,
    KnobModule,
    KeycloakAngularModule,
    DirectivesModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    PermissaoGuard,
    VersionService,
    MessageService,
    ConfirmationService,
    AppConfigService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
