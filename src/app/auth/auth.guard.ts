import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Observable, map, take } from 'rxjs';
import * as AuthActions from '../auth/store/auth.actions';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isStaff: boolean | undefined;
  isOwner: boolean | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user) => {
        const isAuth = !!user;
        const requestedRole = route.data['role'];
        console.log(requestedRole);
        console.log('Call AuthGuard');
        if (!isAuth) {
          return this.router.createUrlTree(['/auth']);
        }

        if (user.is_staff && requestedRole === 'staff') {
          return true;
        } else if (user.is_owner && requestedRole === 'owner') {
          return true;
        } else {
          return this.router.createUrlTree(['/not-found']);
        }
      })
    );
  }
}
