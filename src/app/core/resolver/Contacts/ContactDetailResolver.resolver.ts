import { ContactShowI } from './../../models/Contacts/ContactShow.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailResolver implements Resolve<ContactShowI> {

  constructor(private contactService: ContactService,private router:Router,private readonly _toastService:ToastService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactShowI> {
    const id = route.paramMap.get('id');
    return this.contactService.getContactById(id).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err.status==500){
          this._toastService.presentToastError("Error del servidor!")
          this.router.navigate(['/dashboard/contacts']);
        }
        return throwError(() => err);
      })
    );
  }
}
