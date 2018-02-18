import { Interest } from './../../types/Interest.class';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile-interest',
  template: `
  <mat-expansion-panel [expanded]="expanded">
  
      <mat-expansion-panel-header collapsedHeight="80px" expandedHeight="80px" >
      <mat-panel-title>
      <div class="title"> Cela peut vous intéresser </div>
    </mat-panel-title>
  
      </mat-expansion-panel-header>
  
      <div class="panel-body">

        <div *ngIf="interest.isEmpty()">
          Veuillez vous connecter pour découvrir les produits et les tickets.
        </div>

        <app-ticket-item-list [tickets]="interest?.tickets">
        </app-ticket-item-list>
    
        <app-product-item-list [products]="interest?.products">
        </app-product-item-list>
        
      </div>
  
    </mat-expansion-panel >
  `,
  styleUrls: ['./tile-interest.component.scss']
})
export class TileInterestComponent implements OnInit {

  @Input() interest: Interest;
  @Input() expanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
