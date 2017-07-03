import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { APP_DECLARATIONS } from './app.declarations';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

import { routes } from './app.routing';

import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLARATIONS
  ],
  imports: [
    CommonModule,
    DEV_SERVER ? [BrowserAnimationsModule] : [],
    HttpModule,
    APP_IMPORTS,
    RouterModule.forRoot(routes, {useHash: false, preloadingStrategy: PreloadAllModules}),
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [APP_PROVIDERS]
})
export class AppModule {}
