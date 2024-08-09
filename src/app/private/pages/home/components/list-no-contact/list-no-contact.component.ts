import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';

@Component({
  selector: 'app-list-no-contact',
  templateUrl: './list-no-contact.component.html',
  styleUrls: ['./list-no-contact.component.scss'],
  standalone:true,
  imports: [IonicModule,CommonModule,AvatarInitialsComponent],
})
export class ListNoContactComponent  {
  @Input({required:true}) text!:string;
  constructor() { }


}
