import { debounceTime } from 'rxjs';
import { splitName } from './../../../../core/helpers/AvatarNameContact';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  starHalfOutline,
  closeCircleOutline,
  star,
  trashOutline,
} from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouterModule } from '@angular/router';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    AvatarInitialsComponent
  ],
})
export default class ContactDetailPage implements OnInit {
  @Input({required:true}) id!:string;
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  isEditMode = false;
  isContactFavorite = false;
  firstName: string = '';
  lastName: string = '';
  contactForm!: FormGroup;
  backUpForm:any;
  constructor() {
    this.registerForm();
    this.registerIcons();
    this.contactForm.disable();
      this.name?.valueChanges.pipe(
        debounceTime(300),takeUntilDestroyed()
      ).subscribe((data: string) => {
        this.setAvatarProfile(data)
    });
  }

  ngOnInit() {
    // Simulación de la carga de datos originales
    const initialData = {
      name: 'Jean Rodriguez',
      phone: '0963150796',
      nickname: 'JP'
    };
    this.setAvatarProfile(initialData.name)
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
      trashOutline
    });
  }
  deleteContact(){
    this.toastService.presentToastError('Eliminar contacto!');

  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.contactForm.enable();
    } else {
      this.createContact();
    }
  }
  addFavorites() {
    const audio = new Audio('assets/sounds/water-droplet.mp3');
    audio.play();
    if (this.isContactFavorite) {
      this.isContactFavorite=false;
      this.toastService.presentToastSucess('quitar de favoritos');
    } else {
      this.isContactFavorite=true;
      this.toastService.presentToastSucess('agregar a favoritos');
    }
  }
  cancelEdit() {
    this.isEditMode = false;
    this.contactForm.disable();
    this.contactForm.reset(this.backUpForm);
  }
  createContact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.toastService.presentToastSucess('¡Formulario valido!');
      this.contactForm.disable();
    } else {
      this.toastService.presentToastError('¡Formulario invalido!');
      this.isEditMode = !this.isEditMode;
      this.contactForm.enable();
    }
  }
  private setAvatarProfile(data:any){
    const { firstName, lastName } = splitName(data);
      this.firstName = firstName;
      this.lastName = lastName;
  }

}
