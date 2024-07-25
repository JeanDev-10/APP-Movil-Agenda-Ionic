import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LogoutI, ProfileI } from 'src/app/auth/models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly api_url=`${environment.ApiUrl}auth`;
  private readonly _http=inject(HttpClient)
  profile(){
    return this._http.get<ProfileI>(`${this.api_url}/profile`)
  }
  logout(){
    return this._http.post<LogoutI>(`${this.api_url}/logout`,{})
  }

}
