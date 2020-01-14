import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { AddGamerComponent } from './gamer/add-gamer/add-gamer.component';
import { SearchGamerComponent } from './gamer/search-gamer/search-gamer.component';
import { GamerDetailComponent } from './gamer/gamer-detail/gamer-detail.component';
import { GamerResolver } from './gamer/gamer.resolver';


const routes: Routes = [
  { path: '', component: ActionComponent},
  { path: 'addGamer', component: AddGamerComponent},
  { path: 'searchGamer', component: SearchGamerComponent},
  { path: 'view/:id', component: GamerDetailComponent, resolve: {gamer: GamerResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
