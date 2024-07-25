import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginI, LogoutI, ProfileI, RegisterI } from '../models/auth.model';
import { LoginFormI, RegisterFormI } from '../models/auth-form.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api_url=`white_${environment.ApiUrl}auth`;
  private readonly _http=inject(HttpClient)

  login(body:LoginFormI){
    return this._http.post<LoginI>(`${this.api_url}/login`,body)
  }
  register(body:RegisterFormI){
    return this._http.post<RegisterI>(`${this.api_url}/register`,body)
  }
  profile(){
    return this._http.get<ProfileI>(`${this.api_url}/profile`)
  }
  logout(){
    return this._http.post<LogoutI>(`${this.api_url}/logout`,{})
  }

}
