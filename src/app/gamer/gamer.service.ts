import { Injectable } from '@angular/core';
import { Gamer } from './gamer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

const ADD_GAMER = '';
const SEARCH_GAMER = '';
const SEARCH_GAMER_BY_ID = '';
const DELETE_GAMER = '';
const PUT_IMAGE = '';
const GET_IMAGE = '';

@Injectable()
export class GamerService{

    private gamers: Gamer[] = [];
    gamersChanged = new Subject<Gamer[]>();
    gamerImageChanged = new Subject<string>();

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

    async searchGamerById(id: string): Promise<any>{
        let params = new HttpParams()
            .set('id', id);
        return await this.httpClient.get(SEARCH_GAMER_BY_ID, {params}).toPromise();
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

    uploadAvatar(id: string, base64EncodedImage: string){
        let data = {
            "data": base64EncodedImage
        };
        let params = new HttpParams().set('key', id);
        this.httpClient.post<any>(PUT_IMAGE, data, 
            {
                params: params
            }).subscribe(
                (response: any) => {
                    console.log(response);
                }
            );
    }

    getAvatar(id: string) {
        let params = new HttpParams().set('key', id);
        this.httpClient.get<any>(GET_IMAGE, {params}).subscribe(
            (result: any) => {
                this.gamerImageChanged.next(result.Body.data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
}