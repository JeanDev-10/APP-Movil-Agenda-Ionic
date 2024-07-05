import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { callOutline, starOutline } from 'ionicons/icons';
import { ListContactComponent } from '../../components/list-contact/list-contact.component';
import { Router, RouterModule } from '@angular/router';
import { ListContactFavoriteComponent } from '../../components/list-contact-favorite/list-contact-favorite.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, CommonModule, FormsModule,ListContactComponent,ListContactFavoriteComponent,RouterModule],
})
export class HomePage implements OnInit {
  selectedSegment: string = 'contacts';


  private router=inject(Router);
  constructor() {
    this.registerIcons();
  }


  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  ngOnInit() {}

  private registerIcons() {
    addIcons({ callOutline, starOutline });
  }
}
