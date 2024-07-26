import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LogoutI, ProfileI } from 'src/app/auth/models/auth.model';
import { environment } from 'src/environments/environment';
import { UserEditProfileI } from '../models/User.model';
import { UserFormChangePasswordI, UserFormCheckPasswordI, UserFormEditProfileI } from '../models/UserForm.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api_url = `${environment.ApiUrl}auth`;
  private readonly _http = inject(HttpClient);
  profile() {
    return this._http.get<ProfileI>(`${this.api_url}/profile`);
  }
  logout() {
    return this._http.post<LogoutI>(`${this.api_url}/logout`, {});
  }
  editProfile(body: UserFormEditProfileI) {
    return this._http.put<UserEditProfileI>(`${this.api_url}/editProfile`, body);
  }
  changePassword(body:UserFormChangePasswordI){
    return this._http.post<UserEditProfileI>(`${this.api_url}/changePassword`, body);
  }
  checkPassword(body:UserFormCheckPasswordI){
    return this._http.post<UserEditProfileI>(`progressbar_spinner_${this.api_url}/check-password`, body);
  }
}
