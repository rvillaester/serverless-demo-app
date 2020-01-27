import { Routes, RouterModule } from "@angular/router";
import { GamerComponent } from './gamer.component';
import { AddGamerComponent } from './add-gamer/add-gamer.component';
import { SearchGamerComponent } from './search-gamer/search-gamer.component';
import { GamerDetailComponent } from './gamer-detail/gamer-detail.component';
import { GamerResolver } from './gamer.resolver';
import { NgModule } from '@angular/core';
import { GamerHomeComponent } from './gamer-home/gamer-home.component';

const gamerRoutes: Routes = [
    { path: '', component: GamerComponent, children: [
        { path: '', component: GamerHomeComponent},
        { path: 'addGamer', component: AddGamerComponent},
        { path: 'searchGamer', component: SearchGamerComponent},
        { path: 'view/:id', component: GamerDetailComponent, resolve: {gamer: GamerResolver}}
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(gamerRoutes)
    ],
    exports: [RouterModule],
    providers: []
})

export class GamerRoutingModule{}