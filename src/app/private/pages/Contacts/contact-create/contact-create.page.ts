import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { arrowForwardCircle, personAddOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.page.html',
  styleUrls: ['./contact-create.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,RouterModule
  ],
})
export default class ContactCreatePage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);

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
    addIcons({ personAddOutline,arrowForwardCircle });
  }
  createContact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      this.toastService.presentToastError('¡Formulario invalido!');
    }
  }
}
