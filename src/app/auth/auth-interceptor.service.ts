import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpEvent,
} from '@angular/common/http';
import { take, map, exhaustMap, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,private store: Store<fromApp.AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAccess();
    console.log('startinter:'+ authToken);
    if (authToken) {
      const modifiedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('endinter:'+ authToken);
      return next.handle(modifiedRequest);
      
    }else{
      console.log('non user:');
      return next.handle(req);
    }
  }
}
