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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, CommonModule, FormsModule,ListContactComponent,RouterModule,AvatarInitialsComponent],
})
export class HomePage  {
  selectedSegment: string = 'contacts';
  selectedFilter:string="Todos"
  selectedSearch:string="Nombre"
  filter:string="name"

  private router=inject(Router);
  constructor() {
    this.registerIcons();
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
    addIcons({ callOutline, starOutline,star,call,filter });
  }
  handleInputContacts(event:any,type:string){
    const query = event.target.value.toLowerCase();
    console.log(query)
    if(this.selectedSegment=='contacts'){
/**
     * ?llamar a api pasamos filter a la petición
     */
    }else{
/**
     * ?llamar a api pasamos filter a la petición
     */
    }

  }
  handleChangeFilter(e:any){
    this.filter=e.detail.value
    if(this.filter=='all'){
      this.selectedFilter="Todos";
    }
    if(this.filter=='name'){
      this.selectedFilter="Nombre";
    }
    if(this.filter==='phone'){
      this.selectedFilter="Telefono";
    }
    if(this.filter==='nickname'){
      this.selectedFilter="Apodo";
    }
  }

}
