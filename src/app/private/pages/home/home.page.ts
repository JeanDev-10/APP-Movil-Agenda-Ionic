import { eventsType } from './../../../core/helpers/eventsType';
import {
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { call, callOutline, filter, star, starOutline } from 'ionicons/icons';
import { ListContactComponent } from '../../components/list-contact/list-contact.component';
import { RouterModule } from '@angular/router';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { distinctUntilChanged } from 'rxjs';
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
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  @ViewChild(IonContent) content!: IonContent;
  selectedSegment: string = 'contacts';
  selectedFilter: string = 'Todos';
  selectedSearch: string = 'name';
  queryContacts: string = '';
  IsSearchContact: boolean = false;
  filter: string = '';
  nextPage!: string;
  nextPageFavorites!: string;
  contacts!: ContactGetI;
  favorites!: FavoriteGetI;
  isLoadingContacts = false;
  isLoadingContactsFavorite = false;
  private readonly _contactService = inject(ContactService);
  private readonly _favoriteService = inject(FavoriteService);
  private readonly _eventEmissorService = inject(EventEmissorService);
  constructor() {
    console.log('se ejecuta constructor');
    this.registerIcons();
    this._eventEmissorService
      .getEvent()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (event) => {
          if (event.event == eventsType.UPDATE_CONTACTS) {
            this.enableInfiniteScroll();
            this.getContactsOrderFilter()
          }
          if (event.event == eventsType.UPDATE_CONTACTS_FAVORITES) {
            this.getContactsOrderFilter()
          }
        },
      });
  }
  ngOnInit(): void {
    this.getContactsOrderFilter()
  }
  onIonInfiniteContacts(event: any) {
    if (this.isLoadingContacts) {
      event.target.complete();
      return;
    }

    this.isLoadingContacts = true;

    if (this.nextPage !== 'null') {
      this.contactsApiPaginate();
    } else {
      this.isLoadingContacts = false;
      this.infiniteScroll.disabled = true;
    }
    event.target.complete();
  }
  onIonInfiniteContactsFavorites(event: any) {
    if (this.isLoadingContacts) {
      event.target.complete();
      return;
    }

    this.isLoadingContactsFavorite = true;

    if (this.nextPageFavorites !== 'null') {
      this.contactsApiPaginateFavorites();
    } else {
      this.isLoadingContactsFavorite = false;
      this.infiniteScroll.disabled = true;
    }
    event.target.complete();
  }

  private contactsApiPaginate() {
    this._contactService.getContactsPaginate(this.nextPage).subscribe({
      next: (data) => {
        data.data.data.forEach((d) => {
          this.contacts?.data.data.push(d);
        });
        this.isLoadingContacts = false;
        this.nextPage =
          data.data.links.next != null ? data.data.links.next : 'null';
      },
    });
  }
  private contactsApiPaginateFavorites() {
    this._favoriteService
      .getContactsPaginate(this.nextPageFavorites)
      .subscribe({
        next: (data) => {
          data.data.data.forEach((d) => {
            this.favorites.data.data.push(d);
          });
          this.isLoadingContactsFavorite = false;
          this.nextPageFavorites =
            data.data.links.next != null ? data.data.links.next : 'null';
        },
      });
  }
  private getContactsOrderFilter(){
    if (this.queryContacts !== ' ' && this.filter !== 'all') {
      if (this.selectedSegment == 'contacts') {
        this.getContactsFilterByNameOrderBy();
      } else {
        this.getContactsFavoriteFilterByNameOrderBy();
      }
    } else {
      if (this.selectedSegment == 'contacts') {
        this.getContactsFilter();
      } else {
        this.getContactsFavoriteFilter();
      }
    }
  }
  onChipClick(searchType: string) {
    this.selectedSearch = searchType;
    this.getContactsOrderFilter()
    // Aquí se pueden agregar otras acciones que deban realizarse cuando cambia el chip seleccionado
  }
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log('cambio de contacts a favorite segments');
    this.getContactsOrderFilter();
  }

  private registerIcons() {
    addIcons({ callOutline, starOutline, star, call, filter });
  }
  handleInputContacts(event: any) {
    this.queryContacts = event.target.value.toLowerCase();
    console.log(this.queryContacts);
    this.getContactsOrderFilter()

  }
  handleChangeFilter(e: any) {
    this.filter = e.detail.value;
    this.selectedFilter =
      this.filter === 'all'
        ? 'Todos'
        : this.filter === 'name'
        ? 'Nombre'
        : this.filter === 'phone'
        ? 'Telefono'
        : 'Apodo';
        this.getContactsOrderFilter()
  }
  private getContactsFilterByNameOrderBy() {
    this._contactService
      .getContactsByNameAndOrder(
        this.queryContacts,
        this.selectedSearch,
        this.filter != 'all' ? this.filter : ' '
      )
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data) => {
          this.contacts = data;
          if (this.contacts.data.data.length == 0) {
            this.IsSearchContact = true;
          }
          this.nextPage =
            data.data.links.next != null ? data.data.links.next : 'null';
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  private getContactsFavoriteFilterByNameOrderBy() {
    this._favoriteService
      .getContactsFavoriteByNameAndOrder(
        this.queryContacts,
        this.selectedSearch,
        this.filter!='all'? this.filter:''
      )
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data) => {
          this.favorites = data;
          if (this.contacts.data.data.length == 0) {
            this.IsSearchContact = true;
          }
          this.nextPage =
            data.data.links.next != null ? data.data.links.next : 'null';
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  private getContactsFilter() {
    this._contactService
      .getContactsByName(this.queryContacts, this.selectedSearch)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data) => {
          this.contacts = data;
          if (this.contacts.data.data.length == 0) {
            this.IsSearchContact = true;
          }
          this.nextPage =
            data.data.links.next != null ? data.data.links.next : 'null';
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  private getContactsFavoriteFilter() {
    this._favoriteService
      .getContactsFavoriteByName(this.queryContacts, this.selectedSearch)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data) => {
          this.favorites = data;
          if (this.contacts.data.data.length == 0) {
            this.IsSearchContact = true;
          }
          this.nextPage =
            data.data.links.next != null ? data.data.links.next : 'null';
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  scrollTop() {
    this.content.scrollToTop(500);
  }
  enableInfiniteScroll() {
    if (this.infiniteScroll) {
      console.log('habilitado scroll');
      console.log(this.infiniteScroll);
      this.infiniteScroll.disabled = false;
      this.infiniteScroll.complete();
    } else {
      console.log('no entró al scroll');
    }
  }
}
