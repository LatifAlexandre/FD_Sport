import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
        <a mat-button (click)="onLinkClick()"routerLink="."> 
          <i class="material-icons">home</i>
          Accueil
        </a>

        <a mat-button (click)="onLinkClick()"routerLink="/my-clubs">
          <i class="material-icons">account_box</i>
          Mes Clubs
        </a>

        <a mat-button (click)="onLinkClick()"routerLink="/good-deals"> 
          <i class="material-icons">monetization_on</i>
          Bonnes affaires 
        </a>

        <a mat-button (click)="onLinkClick()"routerLink=".">
          <i class="material-icons">shopping_cart</i>
          Mon panier 
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

  @Output() clickOnMenuBtn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMenuBtn() {
    this.clickOnMenuBtn.emit();
  }

}
