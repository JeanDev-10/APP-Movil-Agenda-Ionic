import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonIcon, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, arrowUndoOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarComponent,LottieComponent,RouterModule]
})
export default class PageNotFoundPage  {
  options: AnimationOptions = {
    path: '/assets/animations/page-not-found.json',
  };

  styles = {
    width: '100%',
    height: 'auto'
  };
  constructor(){
    addIcons({
      'arrow-undo-outline': arrowUndoOutline,
      // Agrega todos los íconos que necesites registrar aquí
    });
  }
}
