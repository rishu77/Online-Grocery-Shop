import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements CanActivate {

  constructor(private dataService:DataService) { }
  canActivate(): boolean {
if(this.dataService.getLoginUser()!=null) return true;
else 
return false;
  }
}
