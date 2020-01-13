import { Injectable } from '@angular/core';
import { Gamer } from './gamer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

const ADD_GAMER = 'https://e6sz6nxzwd.execute-api.ap-southeast-1.amazonaws.com/dev/add-gamer';
const SEARCH_GAMER = 'https://e6sz6nxzwd.execute-api.ap-southeast-1.amazonaws.com/dev/search-gamer';
const DELETE_GAMER = 'https://e6sz6nxzwd.execute-api.ap-southeast-1.amazonaws.com/dev/delete-gamer';

@Injectable()
export class GamerService{

    private gamers: Gamer[] = [];
    gamersChanged = new Subject<Gamer[]>();

    constructor(private httpClient: HttpClient){

    }

    async addGamer(gamer: Gamer){
        return await this.httpClient.post<Gamer>(ADD_GAMER, gamer).toPromise();
    }

    searchGamers(username: string, name: string){
        let params = new HttpParams()
            .set('username', username)
            .set('name', name);
        this.httpClient.get(SEARCH_GAMER, {params})
            .subscribe(
                (data: any) => {
                    this.gamers = data.items;
                    this.gamersChanged.next(this.gamers);
                }
            );
    }

    deleteGamer(index: number, gamer: Gamer){
        console.log(gamer);
        this.httpClient.post<Gamer>(DELETE_GAMER, gamer.id)
            .subscribe(
                (data: any) => {
                    this.gamers.splice(index, 1);
                    this.gamersChanged.next(this.gamers.slice());
                }
            );
    }
}