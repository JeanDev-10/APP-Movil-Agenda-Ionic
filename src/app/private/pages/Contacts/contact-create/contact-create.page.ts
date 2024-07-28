import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { arrowForwardCircle, personAddOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router, RouterModule } from '@angular/router';
import { AvatarInitialsComponent } from 'src/app/shared/components/avatar-initials/avatar-initials.component';
import { splitName } from 'src/app/core/helpers/AvatarNameContact';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactService } from 'src/app/core/services/contact.service';
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
    ReactiveFormsModule,
    RouterModule,
    AvatarInitialsComponent,
  ],
})
export default class ContactCreatePage{
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private _contactService=inject(ContactService);
  private _router=inject(Router);
  firstName: string = '';
  lastName: string = '';
  contactForm!: FormGroup;

  constructor() {
    this.registerForm();
    this.registerIcons();
    this.contactForm.get('name')?.valueChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed()
    ).subscribe((data: string) => {
      const { firstName, lastName } = splitName(data);
      this.firstName = firstName;
      this.lastName = lastName;
    });
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
    addIcons({ personAddOutline, arrowForwardCircle });
  }


  createContact() {
    if (this.contactForm.valid) {
      this._contactService.create(this.contactForm.value).subscribe({
        next:()=>{
            this.toastService.presentToastSucess('¡Contacto creado exitosamente!')
            this._router.navigateByUrl('/dashboard/contacts');
        },
        error:(error)=>{
          console.log(error);
        }
      })
      console.log(this.contactForm.value);
    } else {
      this.toastService.presentToastError('¡Formulario invalido!');
    }
  }
}

