import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../types/Product.class';

@Component({
  selector: 'app-product-item',
  template:`

  <div class="product-item" [routerLink]="['/product', product.id]">

    <div class="left">
      <div class="product-name" >
        {{ product.name}}  
      </div>
      
      <div class="prices">
        <div class="initial-price">
          {{ product.price.initialPrice }} €
        </div>
        <div class="price">
          {{ product.price.getReducedPrice() }} €
        </div>
      </div>
    </div>
    <img [src]="product.pictureLink">

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
