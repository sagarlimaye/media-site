import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../login.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap, skipWhile, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    tokenSubscription: Subscription;
    constructor(private loginService: LoginService, private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.loginService.tokenSubject.value;
        
        const authReq = req.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });

        return next.handle(authReq).pipe(
            tap(null, error => {
                if(error instanceof HttpErrorResponse && (error as HttpErrorResponse).status == 401)
                    this.router.navigate(['/login']);
            })
        );
    }

}
