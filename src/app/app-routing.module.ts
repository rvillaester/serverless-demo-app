import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { AddGamerComponent } from './gamer/addGamer/add-gamer.component';
import { SearchGamerComponent } from './gamer/search-gamer/search-gamer.component';


const routes: Routes = [
  { path: '', component: ActionComponent},
  { path: 'addGamer', component: AddGamerComponent},
  { path: 'searchGamer', component: SearchGamerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
