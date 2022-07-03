import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGuardGuard implements CanActivate {
  constructor(private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username_hash = route.paramMap.get('username');
    const password_hash = route.paramMap.get('password');
    if (username_hash == 
      "16f78a7d6317f102bbd95fc9a4f3ff2e3249287690b8bdad6b7810f82b34ace3"
      &&
      password_hash ==
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"){
        return true;
      }
      alert("login failed");
      this.router.navigate(['/login']);
      return false;
  }  
}
