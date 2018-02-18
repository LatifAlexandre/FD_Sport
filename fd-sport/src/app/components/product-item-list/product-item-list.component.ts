import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../types/Product.class';

@Component({
  selector: 'app-product-item-list',
  template:`

    <!--
    <div
      ng2-carouselamos
      class="slides-wrapper"
      [items]="products"
      [width]="width"
      [$prev]="prev"
      [$next]="next"
      [$item]="item">
    </div>
  
    <ng-template #prev>
      <i class="material-icons">keyboard_arrow_left</i>
    </ng-template>

    <ng-template #next>
    <i class="material-icons">keyboard_arrow_right</i>
    </ng-template>

    <ng-template #item let-item let-i="index">
      <app-product-item [product]="item">
      chargement...
      </app-product-item>
    </ng-template>
    -->

    <app-product-item *ngFor="let product of products"
                       [product]="product">
                       chargement...
    </app-product-item>
  `,
  styleUrls: ['./product-item-list.component.scss']
})
export class ProductItemListComponent implements OnInit {

  @Input() products: Product[];
  //@Input() width: number;

  constructor() {
    
  }

  ngOnInit() {
  }

}
