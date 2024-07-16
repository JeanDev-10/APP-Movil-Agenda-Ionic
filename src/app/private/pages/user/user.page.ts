import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, SegmentChangeEventDetail } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  mail,
  personOutline,
  eyeOffOutline,
  eyeOutline,
  sunny,
} from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { passwordMatchValidatorProfile } from 'src/app/core/helpers/validators-new-password';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';

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
  ],
})
export default class UserPage implements OnInit {
  selectedSegment: string = 'perfil';
  private toastService = inject(ToastService);
  darkMode: boolean = true;
  constructor() {
    this.registerIcons();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {}
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
}
