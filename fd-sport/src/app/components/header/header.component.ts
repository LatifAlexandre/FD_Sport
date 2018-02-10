import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar>
    
    <button mat-icon-button>
      <i class="material-icons">menu</i>
    </button>
    
    <span> FD Sport </span>

    <button mat-icon-button>
      <i class="material-icons">search</i>
    </button>

  </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
