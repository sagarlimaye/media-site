import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from '../login.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    tokenSubscription: Subscription;
    constructor(private loginService: LoginService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.loginService.tokenSubject.pipe(
            switchMap(token => {
                const authReq = req.clone({
                    setHeaders: {
                        Authorization: "Bearer " + token
                    }
                });

                return next.handle(authReq);
            })
        );
    }

}
