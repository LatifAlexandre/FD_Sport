import { Component, OnInit, Input } from '@angular/core';
import { GoodDeals } from '../../types/GoodDeals.class';
import {} from './../../../../res/'

@Component({
  selector: 'app-tile-good-deals',
  template:`
  <mat-expansion-panel [expanded]="expanded">
  
      <mat-expansion-panel-header collapsedHeight="80px" expandedHeight="80px" >
        <mat-panel-title>
          <div class="picture">
            <img src="../../assets/good-deals-logo.jpg"  class="header-picture">
          </div>
          <div class="title"> Bonnes affaires </div>
        </mat-panel-title>
  
      </mat-expansion-panel-header>
  
      <div class="panel-body">

        <app-ticket-item-list [tickets]="goodDeals.tickets">
        </app-ticket-item-list>
    
        <app-product-item-list [products]="goodDeals.products">
        </app-product-item-list>
        
        <button mat-raised-button class="more-info-btn" routerLink="/good-deals">
          <i class="material-icons">find_in_page</i>
          Bonnes affaires
        </button>
      </div>
  
    </mat-expansion-panel >
  `,
  styleUrls: ['./tile-good-deals.component.scss']
})
export class TileGoodDealsComponent implements OnInit {

  @Input() goodDeals: GoodDeals;
  @Input() expanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
