import { HttpClient } from '@angular/common/http';
import { inject, Injectable, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavoriteGetI } from '../models/Favorites/Favorites.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly api_url = `${environment.ApiUrl}favorite`;
  private readonly _http = inject(HttpClient);
  getFavorites(){
    return this._http.get<FavoriteGetI>(`${this.api_url}`);
  }
}
