import { Component, OnInit } from '@angular/core';
import { SandboxService } from '../../services/sandbox.service';
import { GoodDeals } from '../../types/GoodDeals.class';

@Component({
  selector: 'app-good-deals-page',
  template: `
    <h2> Bonnes affaires </h2>

    <h3> Les tickets pour les évènements </h3>
      
    <app-ticket-item-list [tickets]="goodDeals.tickets">
    </app-ticket-item-list>

    <h3> Les produits </h3>

    <app-product-item-list [products]="goodDeals.products">
    </app-product-item-list>

  `,
  styleUrls: ['./good-deals-page.component.scss']
})
export class GoodDealsPageComponent implements OnInit {

  goodDeals: GoodDeals;

  constructor(private sb: SandboxService) {
    this.goodDeals = this.sb.getGoodDeals();
  }

  ngOnInit() {
  }

}
