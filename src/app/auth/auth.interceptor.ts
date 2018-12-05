import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpUserEvent} from '@angular/common/http';
import {TokenStorage} from './token-storage';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');
    console.log(this.tokenStorage.getToken());
    let authReq = req;
    if (this.tokenStorage.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenStorage.getToken()) });
    }
    return <any>next.handle(authReq);
  }
}
