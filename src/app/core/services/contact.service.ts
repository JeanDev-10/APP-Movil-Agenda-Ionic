import { HttpClient } from '@angular/common/http';
import { inject, Injectable, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseCommon } from '../models/User.model';
import { ContactFormCreate } from '../models/Contacts/ContactForm.model';
import { ContactGetI } from '../models/Contacts/Contact.model';
import { ContactShowI } from '../models/Contacts/ContactShow.model';

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
  getContactById(id:string|null) {
    return this._http.get<ContactShowI>(`${this.api_url}/${id}`);
  }
  delete(id:string){
    return this._http.delete<ResponseCommon>(`${this.api_url}/${id}`);
  }
  editContact(id:string,body:ContactFormCreate){
    return this._http.put<ResponseCommon>(`${this.api_url}/${id}`,body);
  }
  getContactsPaginate(url:string){
    return this._http.get<ContactGetI>(`progressbar_spinner_${url}`);
  }
}
