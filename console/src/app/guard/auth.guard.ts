import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService,private router:Router,private toastr:ToastrService)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.IsloggedIn())
      {
        if(route.url.length>0)
        {
          let menu=route.url[0].path;
          if(menu == 'user' || menu == 'licenses')
          {
            if(this.service.getUserRole()=='1' || this.service.getUserRole()=='2')
            {
              return true;
            }
            else
            {
              this.toastr.error("Sorry you don't have access to the tab! This is going to be reported","Admin Only");
              this.router.navigate(['/home']);
              return false;
            }
          }else if(menu == 'orgs')
          {
            if(this.service.getUserRole()=='1')
            {
              return true;
            }
            else
            {
              this.toastr.error("Sorry you don't have access to the tab! This is going to be reported","Global Admin Only");
              this.router.navigate(['/home']);
              return false;
            }
          }

          else
          {
            return true;
          }
        }
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    return true;
  }
  
}
