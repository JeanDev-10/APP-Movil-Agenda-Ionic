import { debounceTime } from 'rxjs';
import { splitName } from './../../../../core/helpers/AvatarNameContact';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personAddOutline,
  arrowForwardCircle,
  pencilOutline,
  starOutline,
  closeCircleOutline,
  star,
  trashOutline,
} from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Data } from 'src/app/core/models/Contacts/ContactShow.model';
import { ContactService } from 'src/app/core/services/contact.service';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { eventsType } from 'src/app/core/helpers/eventsType';
import { EventEmissorService } from 'src/app/core/services/event-emissor.service';
import { ContactFormCreate } from 'src/app/core/models/Contacts/ContactForm.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AvatarInitialsComponent,
  ],
})
export default class ContactDetailPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _contactService = inject(ContactService);
  private readonly _favoriteService = inject(FavoriteService);
  private readonly _toastService = inject(ToastService);
  private readonly _eventEmissorService = inject(EventEmissorService);
  private readonly _alertController = inject(AlertController);
  private _router = inject(Router);

  contact!: Data;
  isEditMode = false;
  isContactFavorite = false;
  firstName: string = '';
  lastName: string = '';
  contactForm!: FormGroup;
  backUpForm!: ContactFormCreate;
  constructor() {
    this.registerForm();
    this.registerIcons();
    this.contactForm.disable();
    this.name?.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((data: string) => {
        this.setAvatarProfile(data);
      });
  }

  ngOnInit() {
    console.log(
      'Datos enviados por Data property ==> ',
      this._activatedRoute.snapshot.data
    );
    this.contact = this._activatedRoute.snapshot.data['contact'].data;
    this.isContactFavorite = this.contact.favoritos?.id ? true : false;
    const initialData = {
      name: this.contact.name,
      phone: this.contact.phone,
      nickname: this.contact.nickname,
    };
    this.setAvatarProfile(initialData.name);
    this.contactForm.patchValue(initialData);
    this.backUpForm = { ...initialData }; // Guardar una copia de los datos originales
  }

  private registerForm() {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      nickname: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    });
  }
  get name() {
    return this.contactForm.get('name');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get nickname() {
    return this.contactForm.get('nickname');
  }
  private registerIcons() {
    addIcons({
      personAddOutline,
      arrowForwardCircle,
      pencilOutline,
      starOutline,
      star,
      closeCircleOutline,
      trashOutline,
    });
  }
   async presentAlertDelete() {
    const alert = await this._alertController.create({
      header: 'Detalle de contacto',
      message: '¿Estás seguro de eliminar este contacto?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.deleteContact();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },

      ],
      animated: true,
      backdropDismiss: true,
    });

    await alert.present();
  }


  deleteContact() {
     this._contactService.delete(this.contact.id).subscribe({
      next: () => {
        this._toastService.presentToastSucess(
          '¡Contacto eliminado correctamente!'
        );
        this._eventEmissorService.setEvent({
          event: eventsType.UPDATE_CONTACTS,
        });
        this._eventEmissorService.setEvent({
          event: eventsType.UPDATE_CONTACTS_FAVORITES,
        });
        this._router.navigate(['/dashboard/contacts']);
      },
      error: (error) => {

        console.error(error);
      },
    });
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.contactForm.enable();
    } else {
      this.editContact();
    }
  }
  addFavorites() {
    const audio = new Audio('assets/sounds/water-droplet.mp3');
    audio.play();
    if (this.isContactFavorite) {
      this._favoriteService
        .deleteFavorites(this.contact.favoritos?.id)
        .subscribe({
          next: () => {
            this.isContactFavorite = false;
            this.toastService.presentToastSucess(
              '¡Eliminado de favoritos correctamente!'
            );
            this._eventEmissorService.setEvent({
              event: eventsType.UPDATE_CONTACTS_FAVORITES,
            });
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this._favoriteService
        .addFavorites({ contact_id: this.contact.id })
        .subscribe({
          next: () => {
            this.isContactFavorite = true;
            this._eventEmissorService.setEvent({
              event: eventsType.UPDATE_CONTACTS_FAVORITES,
            });

            this.toastService.presentToastSucess(
              'Contacto agregado a favoritos correctamente!'
            );
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
  cancelEdit() {
    this.isEditMode = false;
    this.contactForm.disable();
    this.contactForm.reset(this.backUpForm);
  }
  editContact() {
    if (this.contactForm.valid) {
      if (this.verifyChangesToEditContact()) {
        this._toastService.presentToastError(
          '¡No has realizado ningun cambio en los datos!'
        );
      this.isEditMode = !this.isEditMode;

      } else {
        this._contactService
          .editContact(this.contact.id, this.contactForm.value)
          .subscribe({
            next: () => {
              this.toastService.presentToastSucess(
                '¡Contacto editado exitosamente!'
              );
              this._eventEmissorService.setEvent({
                event: eventsType.UPDATE_CONTACTS,
              });
              this.backUpForm = this.contactForm.value;
              this.contactForm.disable();
            },
            error: (error) => {
              console.error(error);
            },
          });
      }
    } else {
      this.toastService.presentToastError('¡Formulario invalido!');
      this.isEditMode = !this.isEditMode;
      this.contactForm.enable();
    }
  }
  private setAvatarProfile(data: any) {
    const { firstName, lastName } = splitName(data);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  private verifyChangesToEditContact():boolean{
    if(this.backUpForm.name==this.name?.value&&this.backUpForm.nickname==this.nickname?.value&&this.backUpForm.phone===this.phone?.value){
      return true;
    }else{
      return false
    }
  }
}
