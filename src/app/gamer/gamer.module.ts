import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddGamerComponent } from './add-gamer/add-gamer.component';
import { SearchGamerComponent } from './search-gamer/search-gamer.component';
import { GamerListComponent } from './gamer-list/gamer-list.component';
import { GamerDetailComponent } from './gamer-detail/gamer-detail.component';
import { GamerComponent } from './gamer.component';
import { GamerService } from './gamer.service';
import { GamerResolver } from './gamer.resolver';
import { GamerRoutingModule } from './gamer-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GamerHomeComponent } from './gamer-home/gamer-home.component';

@NgModule({
  declarations: [
    AddGamerComponent,
    SearchGamerComponent,
    GamerListComponent,
    GamerDetailComponent,
    GamerComponent,
    GamerHomeComponent,
  ],
  imports: [
    CommonModule,
    GamerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GamerService, GamerResolver]
})

export class GamerModule { }
