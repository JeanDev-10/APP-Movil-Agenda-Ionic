import { Component, OnInit, inject } from '@angular/core';
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
} from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouterModule } from '@angular/router';

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
  ],
})
export default class ContactDetailPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  isEditMode = false;
  isContactFavorite = false;
  contactForm!: FormGroup;
  constructor() {
    this.registerForm();
    this.registerIcons();
  }

  ngOnInit() {}

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
      starHalfOutline,
    });
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
    // Aquí se puede agregar lógica para restablecer el formulario a su estado original si es necesario
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
}
