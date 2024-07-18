import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  sunny,
} from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { splitName } from 'src/app/core/helpers/AvatarNameContact';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditProfileComponent,
    EditPasswordComponent,
    AvatarInitialsComponent
  ],
})
export default class UserPage implements OnInit {
  selectedSegment: string = 'perfil';
  firstName:string="";
  lastName:string="";
  private toastService = inject(ToastService);
  darkMode: boolean = true;
  constructor() {
    this.registerIcons();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }


  ngOnInit() {
    this.setAvatarProfile("Jean","Rodriguez")
  }
  handleAvatarNaem(event:any){
    this.setAvatarProfile(event.firstName,event.lastName)
  }
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  logout() {
    this.toastService.presentToastSucess('¡Sesión cerrada exitosa!');
  }
  registerIcons() {
    addIcons({ logOutOutline,sunny });
  }
  toogleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark' );
  }
  private setAvatarProfile(firstName:string,lastName:string){

      this.firstName = firstName;
      this.lastName = lastName;
  }
}
