import { eventsType } from './../../../core/helpers/eventsType';
import {
  AfterViewInit,
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
import { Router, RouterModule } from '@angular/router';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
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
  queryContacts:string="";
  IsSearchContact: boolean = false;
  filter: string = 'name';
  nextPage!: string;
  nextPageFavorites!: string;
  contacts!: ContactGetI;
  favorites!: FavoriteGetI;
  isLoadingContacts = false;
  isLoadingContactsFavorite = false;
  private readonly _contactService = inject(ContactService);
  private readonly _favoriteService = inject(FavoriteService);
  private readonly _eventEmissorService = inject(EventEmissorService);
  private router = inject(Router);
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
            this.contactsApi();
          }
          if (event.event == eventsType.UPDATE_CONTACTS_FAVORITES) {
            this.contactsFavoritesApi();
          }
        },
      });
  }
  ngOnInit(): void {
    this.contactsApi();
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
  private contactsApi() {
    this._contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.nextPage =
          data.data.links.next != null ? data.data.links.next : 'null';
      },
    });
  }
  private resetValuesSearch(){
    this.queryContacts="";
    this.IsSearchContact = false;
    this.filter = 'name';
  }
  ionViewDidEnter() {
    console.log('vuelve a la vista');
    this.resetValuesSearch()
    if(this.selectedSegment == 'contacts'){
      this.contactsApi();
    }else{
      this.contactsFavoritesApi()
    }
    this.enableInfiniteScroll();
    this.scrollTop();
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
  private contactsFavoritesApi() {
    this._favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.nextPageFavorites =
          data.data.links.next != null ? data.data.links.next : 'null';
      },
    });
  }
  onChipClick(searchType: string) {
    this.selectedSearch = searchType;
    if(this.queryContacts!==""){
      if(this.selectedSegment == 'contacts'){
        this.getContactsFilter();
      }else{
        this.getContactsFavoriteFilter()
      }
    }
    console.log(`Selected search type: ${searchType}`);
    // Aquí se pueden agregar otras acciones que deban realizarse cuando cambia el chip seleccionado
  }
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log("cambio de contacts a favorite segments")
    if(this.selectedSegment == 'contacts'){
      this.getContactsFilter();
    }else{
      this.getContactsFavoriteFilter()
    }
  }

  private registerIcons() {
    addIcons({ callOutline, starOutline, star, call, filter });
  }
  handleInputContacts(event: any, type: string) {
    this.queryContacts=event.target.value.toLowerCase()
    console.log(this.queryContacts);
    if (this.selectedSegment == 'contacts') {
      /**
       * ?llamar a api pasamos filter a la petición
       */
      this.getContactsFilter();
    } else {
      /**
       * ?llamar a api pasamos filter a la petición
       */
      this.getContactsFavoriteFilter();
    }
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
  }
  private getContactsFilter(){
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
  private getContactsFavoriteFilter(){
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
