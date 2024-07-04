import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonButton,
  IonHeader,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { arrowForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LottieComponent,
    NavbarComponent,
    IonicModule,
    RouterModule
  ],
})
export class WelcomePage {
  options: AnimationOptions = {
    path: '/assets/animations/welcome.json',
  };

  styles = {
    width: '100%',
    height: 'auto',
  };
  constructor(){
    addIcons({
       arrowForwardOutline,
      // Agrega todos los íconos que necesites registrar aquí
    });
  }
}
