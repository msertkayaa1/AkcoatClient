import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';

import { ToastrModule } from 'ngx-toastr';

import { NgxSpinnerModule } from 'ngx-spinner'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoaderInterceptorService } from './helpers/loaderinceptor.service';
import { LoaderComponent } from './components/loader/loader.component';
import { HelpersModule } from './helpers/helpers.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    PanelLayoutComponent,
    LoaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    HelpersModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(
     {
       timeOut: 6000,
       closeButton:true,
       positionClass: 'toast-top-right',
       progressBar:true,
       easing:"ease-in",
       easeTime:300,
       enableHtml:true,
       
       progressAnimation:"decreasing",
       preventDuplicates: false,
     }
   ), // ToastrModule added,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  exports:[NgxSpinnerModule,LoaderComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
