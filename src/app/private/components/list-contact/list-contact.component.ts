import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { splitName } from 'src/app/core/helpers/AvatarNameContact';
import { Datum } from 'src/app/core/models/Contacts/Contact.model';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';

@Component({
  selector: 'app-list-contact',
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule,AvatarInitialsComponent],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
})
export class ListContactComponent implements OnInit {
  firtsname!:string;
  lastname!:string;
  @Input({required:true}) contact!:Datum;
  constructor() { }
  ngOnInit(): void {
    const {firstName,lastName}=splitName(this.contact.name);
    this.firtsname=firstName;
    this.lastname=lastName;

  }


}
