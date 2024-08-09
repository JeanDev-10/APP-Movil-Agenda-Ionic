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
import { UserService } from 'src/app/core/services/user.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';

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
  private _userService=inject(UserService);
  private readonly _router = inject(Router);
  private readonly _localStorageService = inject(LocalStorageService);


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
    this._userService.logout().subscribe({
      next:(data)=>{
        this._localStorageService.deleteToken();
        this.toastService.presentToastSucess('¡Sesión cerrada exitosa!');
        this._router.navigateByUrl('/auth/login')
      },
      error:(error)=>{
        console.error(error)
      }
    })
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
