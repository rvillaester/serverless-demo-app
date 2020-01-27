import { Injectable } from '@angular/core';
import { Gamer } from './gamer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

const ADD_GAMER = 'https://76ihi1bs0m.execute-api.ap-southeast-1.amazonaws.com/dev/add-gamer';
const SEARCH_GAMER = 'https://76ihi1bs0m.execute-api.ap-southeast-1.amazonaws.com/dev/search-gamer';
const DELETE_GAMER = 'https://76ihi1bs0m.execute-api.ap-southeast-1.amazonaws.com/dev/delete-gamer';
const PUT_IMAGE = 'https://76ihi1bs0m.execute-api.ap-southeast-1.amazonaws.com/dev/put-avatar-to-S3';
const GET_IMAGE = 'https://76ihi1bs0m.execute-api.ap-southeast-1.amazonaws.com/dev/get-avatar-from-S3';

@Injectable()
export class GamerService{

    private gamers: Gamer[] = [];
    gamersChanged = new Subject<Gamer[]>();
    gamerAdded = new Subject<any>();
    gamerImageChanged = new Subject<string>();

    constructor(private httpClient: HttpClient){

    }

    addGamer(gamer: Gamer){
        // return await this.httpClient.post<Gamer>(ADD_GAMER, gamer).toPromise();

        this.httpClient.post<Gamer>(ADD_GAMER, gamer)
            .subscribe(
                (data: any) => {
                    this.gamerAdded.next(data);
                },
                (error: any) => {
                    console.log(error);
                    this.gamerAdded.error(error);
                }
            )
    }

    searchGamers(username: string, name: string){
        let params = new HttpParams()
            .set('searchBy', 'criteria')
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
            .set('searchBy', 'id')
            .set('id', id);
        return await this.httpClient.get(SEARCH_GAMER, {params}).toPromise();
    }

    deleteGamer(index: number, gamer: Gamer){
        console.log(gamer);
        this.httpClient.post<Gamer>(DELETE_GAMER, gamer)
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