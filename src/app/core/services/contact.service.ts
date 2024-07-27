import { HttpClient } from '@angular/common/http';
import { inject, Injectable, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseCommon } from '../models/User.model';
import { ContactFormCreate } from '../models/Contacts/ContactForm.model';
import { ContactGetI } from '../models/Contacts/Contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly api_url = `${environment.ApiUrl}contact`;
  private readonly _http = inject(HttpClient);
  getContacts(){
    return this._http.get<ContactGetI>(`${this.api_url}`);
  }
  create(body:ContactFormCreate) {
    return this._http.post<ResponseCommon>(`${this.api_url}`,body);
  }
}
