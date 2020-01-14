import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Gamer } from './gamer.model';
import { GamerService } from './gamer.service';

@Injectable({
    providedIn: 'root'
 })
export class GamerResolver implements Resolve<Gamer> {

    constructor(private gamerService: GamerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Gamer> | Promise<Gamer> | Gamer {
        let id = route.params['id'];
        return this.gamerService.searchGamerById(id).then (
            (data: any) => {
              if(data.items){
                return data.items[0];
              }
            }
          );
    }
}