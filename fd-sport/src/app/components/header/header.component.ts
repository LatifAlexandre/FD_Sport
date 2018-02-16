import { User } from './../../types/User.class';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar>
    <div class="container">

    <!-- logo-left -->
    
    <span class="logo-left" routerLink="/"> 
      <i class="material-icons">explore</i>
      FD Sport 
    </span>

      <!-- link list -->

      <button mat-icon-button class="btn-menu" (click)="onMenuBtn()">
        <i class="material-icons">menu</i>
      </button>

      <div class="link-list">
        <a mat-button routerLink="."> 
          <i class="material-icons">home</i>
        </a>

        <a mat-button routerLink="/good-deals"> 
          <i class="material-icons">monetization_on</i>
        </a>

        <a mat-button routerLink=".">
          <i class="material-icons">shopping_cart</i>
        </a>

        <button mat-raised-button color="primary"  routerLink="/auth">
          Connexion
        </button>

        <a mat-button *ngIf="userLogged" routerLink="/my-clubs">
        <i class="material-icons">account_box</i>
        profile de {{userLogged?.username }} 
      </a>
      </div>

      <!-- logo-right -->
      
      <span class="logo-right" routerLink="/"> 
        <i class="material-icons">explore</i>
        FD Sport
      </span>

      <!-- search -->
  
      <button mat-icon-button class="btn-search" routerLink="/search">
        <i class="material-icons">search</i>
      </button>

      <div class="search">
        <input class="search-field">

        <button mat-icon-button  routerLink="/search">
          <i class="material-icons">search</i>
        </button>

      </div>
      

    </div>
  </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userLogged: User;

  @Output() clickOnMenuBtn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMenuBtn() {
    this.clickOnMenuBtn.emit();
  }

}
