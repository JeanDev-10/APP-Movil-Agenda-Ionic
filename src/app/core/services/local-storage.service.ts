import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import * as jwt_decode from 'jwt-decode';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private readonly _userService:UserService){}
  //metodos para los tokens
  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  loggedIn(): boolean {
    if (this.isTokenValid()) return true;
    return false;
  }
  private isTokenValid(): boolean {
    //verificar token
    const token = localStorage.getItem('token');
    if (!token) return false;
    return this.VerifyisTokenValid(token);
  }
  VerifyisTokenValid(token: string): boolean {
    try {
      const decoded: any = jwt_decode.jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
  deleteToken() {
    return localStorage.removeItem('token');
  }
}
