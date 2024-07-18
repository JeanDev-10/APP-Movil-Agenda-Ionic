import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';

@Component({
  selector: 'app-list-contact',
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule,AvatarInitialsComponent],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
})
export class ListContactComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
