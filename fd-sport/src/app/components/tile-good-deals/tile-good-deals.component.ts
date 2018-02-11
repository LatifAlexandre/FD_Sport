import { Component, OnInit, Input } from '@angular/core';
import { GoodDeals } from '../../types/GoodDeals.class';
import {} from './../../../../res/'

@Component({
  selector: 'app-tile-good-deals',
  template:`
  <mat-expansion-panel expanded="true">
  
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
  
        <button mat-raised-button color="primary" class="more-info-btn" routerLink="/good-deals">
         Voir toute les bonnes affaires
        </button>
      </div>
  
    </mat-expansion-panel >
  `,
  styleUrls: ['./tile-good-deals.component.scss']
})
export class TileGoodDealsComponent implements OnInit {

  @Input() goodDeals: GoodDeals;
  

  constructor() { }

  ngOnInit() {
  }

}
