import { HttpClient } from '@angular/common/http';
import { inject, Injectable, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseCommon } from '../models/User.model';
import { ContactFormCreate } from '../models/Contacts/ContactForm.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly api_url = `${environment.ApiUrl}`;
  private readonly _http = inject(HttpClient);
  create(body:ContactFormCreate) {
    return this._http.post<ResponseCommon>(`${this.api_url}contact`,body);
  }
}
