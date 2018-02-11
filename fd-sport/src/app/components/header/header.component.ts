import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar>
    
    <button mat-icon-button (click)="onMenuBtn()">
      <i class="material-icons">menu</i>
    </button>
    
    <span class="logo" routerLink="/"> 
      <i class="material-icons">explore</i>
      FD Sport 
    </span>

    <button mat-icon-button  routerLink="/search">
      <i class="material-icons">search</i>
    </button>

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
