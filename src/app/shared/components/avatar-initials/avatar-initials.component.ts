import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-avatar-initials',
  templateUrl: './avatar-initials.component.html',
  styleUrls: ['./avatar-initials.component.scss'],
  imports: [NgClass],
  standalone: true,
})
export class AvatarInitialsComponent implements OnInit, OnChanges, AfterViewInit {
  colors: string[] = [
    '#6b5b95', // Original color
    '#feb236', // Original color
    '#d64161', // Original color
    '#ff7b25', // Original color
    '#6a8a82', // Nuevo color
    '#ffcc5c', // Nuevo color
    '#88b04b', // Nuevo color
    '#45a29e', // Nuevo color
    '#ff6f61'  // Nuevo color
  ];

  @Input({ required: true }) firstName: string = "";
  @Input({ required: true }) lastName: string = "";
  @ViewChild('avatar') avatar!: ElementRef;
  fullname: string = "";
  @Input({ required: true }) customClass: string = '';
  private _cdRef = inject(ChangeDetectorRef);

  constructor() {
    console.log("se ejecuta avatar");
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['firstName'] || changes['lastName']) {
      this.fullname = this.getInitials();
      this._cdRef.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.assignRandomColor();
    this.fullname = this.getInitials();
  }

  private getInitials(): string {
    const firstInitial = this.firstName ? this.firstName[0].toUpperCase() : '';
    const lastInitial = this.lastName ? this.lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  private assignRandomColor(): void {
    if (this.avatar) {
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.avatar.nativeElement.style.backgroundColor = randomColor;
      this._cdRef.detectChanges();
    }
  }
}
