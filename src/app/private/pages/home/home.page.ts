import { eventsType } from './../../../core/helpers/eventsType';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { call, callOutline, filter, star, starOutline } from 'ionicons/icons';
import { ListContactComponent } from '../../components/list-contact/list-contact.component';
import { Router, RouterModule } from '@angular/router';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { map, Observable } from 'rxjs';
import { ContactGetI } from 'src/app/core/models/Contacts/Contact.model';
import { ContactService } from 'src/app/core/services/contact.service';
import { FavoriteGetI } from 'src/app/core/models/Favorites/Favorites.model';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { ListNoContactComponent } from './components/list-no-contact/list-no-contact.component';
import { EventEmissorService } from 'src/app/core/services/event-emissor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    CommonModule,
    FormsModule,
    ListContactComponent,
    RouterModule,
    AvatarInitialsComponent,
    ListNoContactComponent,
  ],
})
export class HomePage implements OnInit {
  selectedSegment: string = 'contacts';
  selectedFilter: string = 'Todos';
  selectedSearch: string = 'Nombre';
  filter: string = 'name';
  contacts$: Observable<ContactGetI> = new Observable<ContactGetI>();
  favorites$: Observable<FavoriteGetI> = new Observable<FavoriteGetI>();
  private readonly _contactService = inject(ContactService);
  private readonly _favoriteService = inject(FavoriteService);
  private readonly _eventEmissorService = inject(EventEmissorService);
  private router = inject(Router);
  constructor() {
    this.registerIcons();
    this._eventEmissorService.getEvent().pipe(takeUntilDestroyed()).subscribe({
      next: (event) => {
        if (event.event == eventsType.UPDATE_CONTACTS) {
          this.contactsApi();
        }
        if(event.event==eventsType.UPDATE_CONTACTS_FAVORITES){
          this.contactsFavoritesApi()
        }
      },
    });
  }
  ngOnInit(): void {
    this.contactsApi();
  }
  private contactsApi() {
    this.contacts$ = this._contactService.getContacts();
  }
  private contactsFavoritesApi() {
    this.favorites$ = this._favoriteService.getFavorites();
  }
  onChipClick(searchType: string) {
    this.selectedSearch = searchType;
    console.log(`Selected search type: ${searchType}`);
    // Aquí se pueden agregar otras acciones que deban realizarse cuando cambia el chip seleccionado
  }
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  private registerIcons() {
    addIcons({ callOutline, starOutline, star, call, filter });
  }
  handleInputContacts(event: any, type: string) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    if (this.selectedSegment == 'contacts') {
      /**
       * ?llamar a api pasamos filter a la petición
       */
    } else {
      /**
       * ?llamar a api pasamos filter a la petición
       */
    }
  }
  handleChangeFilter(e: any) {
    this.filter = e.detail.value;
    if (this.filter == 'all') {
      this.selectedFilter = 'Todos';
    }
    if (this.filter == 'name') {
      this.selectedFilter = 'Nombre';
    }
    if (this.filter === 'phone') {
      this.selectedFilter = 'Telefono';
    }
    if (this.filter === 'nickname') {
      this.selectedFilter = 'Apodo';
    }
  }
}
