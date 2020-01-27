import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeedbackService{

    constructor(private httpClient: HttpClient){

    }
}