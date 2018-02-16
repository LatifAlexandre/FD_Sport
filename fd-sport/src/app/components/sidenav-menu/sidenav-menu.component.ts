import { User } from './../../types/User.class';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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
        <a mat-button (click)="onLinkClick()"routerLink="/good-deals"> 
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

      <mat-list-item>
        <button mat-raised-button color="primary" (click)="onLinkClick()" routerLink="/auth">
          connexion   
        </button>
      </mat-list-item>

      <mat-list-item *ngIf="userLogged"> 
      <a mat-button (click)="onLinkClick()"routerLink="/my-clubs">
        <i class="material-icons">account_box</i>
        profile de {{userLogged?.username }} 
      </a> 
    </mat-list-item>
      
    </mat-list>
  `,
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  @Input() userLogged: User;

  @Output() linkClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLinkClick() {
    this.linkClicked.emit()
  }

}
