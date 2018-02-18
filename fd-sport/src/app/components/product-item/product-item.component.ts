import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../types/Product.class';
@Component({
  selector: 'app-product-item',
  template: `

  <div class="product-item" [routerLink]="['/product', product.id]">

    <img [src]="product.pictureLink">
    
    <div class="prices-reduc">
      <div class="prices">
        <div class="initial-price" *ngIf="product.price.reduction != 0">
          {{ product.price.initialPrice }} €
        </div>
        <div class="price">
          {{ product.price.getReducedPrice() }} €
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
