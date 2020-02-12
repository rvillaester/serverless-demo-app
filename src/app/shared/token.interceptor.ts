import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestItem = request;
        let accessToken = '';
        console.log('1');
        this.authService.getAccessToken()
            .then(
                (token) => {
                    accessToken = token;
                    console.log('2')
                }
            );
        requestItem = request.clone({
            headers: request.headers.set("Authorization", accessToken)
        });

        console.log('3');
        return next.handle(requestItem).pipe(
            tap((event: HttpEvent<any>) => {
                console.log(event);
                if (event instanceof HttpResponse) {
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // console.log(err);
                    if (err.status === 401) {
                    }
                }
            })
        );
    }
}
