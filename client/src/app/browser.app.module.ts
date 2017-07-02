import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components';
import { AppModule } from './app.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    AppModule
  ]
})
export class BrowserAppModule { }
