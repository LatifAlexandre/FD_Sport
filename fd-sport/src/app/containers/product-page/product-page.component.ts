import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandboxService } from '../../services/sandbox.service';
import { Product } from '../../types/Product.class';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="content">

      <h2> {{ (product$ | async)?.name }} </h2>
      
      <div class="header">
        <div class="picture-header">
          <div class="reduction">
            {{ (product$ | async)?.price.reduction }} %
          </div>
          <img [src]="(product$ | async)?.pictureLink" style='height: 100%; width: 100%; object-fit: contain'/> 
         
        </div>
      
        <div class="info-header">
          <div class="prices">
            <div class="initialPrice">
             {{ (product$ | async)?.price.initialPrice }} €
            </div>  
            <div class="price">
              {{ (product$ | async)?.price.getReducedPrice() }} €
            </div>
          </div>

          <div class="note">
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
          </div>
    
          <button mat-raised-button class="buy-btn"> 
            <i class="material-icons">add_shopping_cart</i>
            ajouter au panier
          </button>

        </div>
      </div>
      

      <div class="related-items">
        <h3> Related items </h3> 
        <app-ticket-item-list [tickets]="(product$ | async)?.relatedTickets">
        </app-ticket-item-list>

        <app-product-item-list [products]="(product$ | async)?.relatedProducts">
        </app-product-item-list>
      </div>

        
      <div class="comments">
        <h3> comments </h3>  
      </div>

      <div class="description">
        <h3> description </h3> 

        <p>
          {{ (product$ | async)?.description }}
        </p>
      </div>

    </div>
  `,
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;

  product$: Observable<Product>;

  constructor(private route: ActivatedRoute,
              private sb: SandboxService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.product$ = this.sb.getProduct(this.id);
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
