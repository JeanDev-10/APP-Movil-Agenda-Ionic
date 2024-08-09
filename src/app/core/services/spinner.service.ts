import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$=new Subject<boolean>();
  isLoadingSpecialSpinner$=new Subject<boolean>();
  show():void{
    this.isLoading$.next(true);
  }
  hide():void{
    this.isLoading$.next(false);
  }
  showSpecial() {
    this.isLoadingSpecialSpinner$.next(true);
  }

  hideSpecial() {
    this.isLoadingSpecialSpinner$.next(false);
  }
}
