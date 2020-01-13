import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActionComponent } from './action/action.component';
import { AddGamerComponent } from './gamer/add-gamer/add-gamer.component';
import { SearchGamerComponent } from './gamer/search-gamer/search-gamer.component';
import { GamerService } from './gamer/gamer.service';
import { GamerListComponent } from './gamer/gamer-list/gamer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ActionComponent,
    AddGamerComponent,
    SearchGamerComponent,
    GamerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GamerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
