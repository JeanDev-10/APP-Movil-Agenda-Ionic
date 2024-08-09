import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonTitle, IonToolbar, IonHeader,IonBackButton,IonButtons,IonProgressBar } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-navbar',
  imports:[IonHeader,IonToolbar,IonTitle,IonBackButton,IonButtons,LoadingComponent,AsyncPipe,IonProgressBar],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent{
  @Input({required:true}) title:string="";
  @Input() hrefDefault:string="";
  private readonly spinnerService = inject(SpinnerService);
  isLoadingSpecialSpinner$!:Subject<boolean>;

  constructor() {
    this.isLoadingSpecialSpinner$=this.spinnerService.isLoadingSpecialSpinner$;

   }


}
