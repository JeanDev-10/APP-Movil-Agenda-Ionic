import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavoriteGetI } from '../models/Favorites/Favorites.model';
import { ResponseCommon } from '../models/User.model';
import { FavoriteFormAddI } from '../models/Favorites/FavoriteForms.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly api_url = `${environment.ApiUrl}favorite`;
  private readonly _http = inject(HttpClient);
  getFavorites() {
    return this._http.get<FavoriteGetI>(`${this.api_url}`);
  }
  addFavorites(body: FavoriteFormAddI) {
    return this._http.post<ResponseCommon>(`${this.api_url}`, body);
  }
  deleteFavorites(id: number | undefined) {
    return this._http.delete<ResponseCommon>(`${this.api_url}/${id}`);
  }
  getContactsPaginate(url:string){
    return this._http.get<FavoriteGetI>(`progressbar_spinner_${url}`);
  }

}
