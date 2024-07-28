import { ContactShowI } from './../../models/Contacts/ContactShow.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from '../../services/contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailResolver implements Resolve<ContactShowI> {

  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactShowI> {
    const id = route.paramMap.get('id');
    return this.contactService.getContactById(id);
  }
}
