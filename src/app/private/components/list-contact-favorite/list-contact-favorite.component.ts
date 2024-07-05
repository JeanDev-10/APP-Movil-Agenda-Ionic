import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list-contact-favorite',
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule],
  templateUrl: './list-contact-favorite.component.html',
  styleUrls: ['./list-contact-favorite.component.scss'],
})
export class ListContactFavoriteComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
