import { NgModule } from '@angular/core';
import { CoresModule } from './cores/cores.module';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './cores/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhanolinkBreadcrumbModule } from '@shared/components/phanolink-breadcrumb/phanolink-breadcrumb.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoresModule,
    SharedModule,
    MatDialogModule,
    PhanolinkBreadcrumbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
