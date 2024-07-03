import { Component, Input, OnInit } from '@angular/core';
import { IonTitle, IonToolbar, IonHeader,IonBackButton,IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  imports:[IonHeader,IonToolbar,IonTitle,IonBackButton,IonButtons],
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  @Input({required:true}) title:string="";
  @Input() hrefDefault:string="";

  constructor() { }

  ngOnInit() {}

}
