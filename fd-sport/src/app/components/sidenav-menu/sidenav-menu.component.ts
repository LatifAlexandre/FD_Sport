import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-menu',
  template: `
    <mat-list>

      <mat-list-item> 
        <a mat-button (click)="onLinkClick()"routerLink="."> 
          <i class="material-icons">home</i>
          Accueil
        </a> 
      </mat-list-item>

      <mat-list-item> 
        <a mat-button (click)="onLinkClick()"routerLink="/my-clubs">
          <i class="material-icons">account_box</i>
          Mes Clubs
        </a> 
      </mat-list-item>

      <mat-list-item>
        <a mat-button (click)="onLinkClick()"routerLink="."> 
          <i class="material-icons">monetization_on</i>
          Bonnes affaires 
        </a> 
      </mat-list-item>

      <mat-list-item> 
        <a mat-button (click)="onLinkClick()"routerLink=".">
          <i class="material-icons">shopping_cart</i>
          Mon panier 
        </a> 
      </mat-list-item>

      <mat-list-item> 
        <a mat-button (click)="onLinkClick()"routerLink="/search">
          <i class="material-icons">search</i>
          Rechercher 
        </a> 
      </mat-list-item>

    </mat-list>
  `,
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  @Output() linkClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLinkClick() {
    this.linkClicked.emit()
  }

}
