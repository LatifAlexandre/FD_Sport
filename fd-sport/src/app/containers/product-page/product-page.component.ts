import { Profile } from './../../types/Profile.class';
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
          <div class="reduction" *ngIf="(product$ | async)?.price.reduction != 0">
            {{ (product$ | async)?.price.reduction }} %
          </div>
          <img [src]="(product$ | async)?.pictureLink" style='height: 100%; width: 100%; object-fit: contain'/> 
         
        </div>
      
        <div class="info-header">
          <div class="prices">
            <div class="price">
              {{ (product$ | async)?.price.getReducedPrice() }} €
            </div>
            <div class="initialPrice" *ngIf="(product$ | async)?.price.reduction != 0">
            {{ (product$ | async)?.price.initialPrice }} €
           </div>  
          </div>

          <div class="note">
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_rate</i>
            <i class="material-icons">star_half</i>
          </div>

          <div class="labels">
            <img  class="label"
                  src="https://thumb9.shutterstock.com/display_pic_with_logo/3928919/710037388/stock-vector-official-product-stamp-design-vector-art-710037388.jpg">  
            <img  class="label"
                  src="https://www.prostagespermis.fr/upload/images/Satisfait%20ou%20rembours%C3%A9_1.png"> 
            <img  class="label"
                  src="http://www.cuistoshop.com/imgfck/226/Image/LR.jpg">  
          </div>
    
          <button mat-raised-button class="buy-btn"> 
            <i class="material-icons">add_shopping_cart</i>
            ajouter au panier
          </button>

        </div>
      </div>
      

      <div class="related-items">
      <h3> Related items </h3> 

        <app-product-item-list [products]="(product$ | async)?.relatedProducts">
        </app-product-item-list>

        <app-ticket-item-list [tickets]="(product$ | async)?.relatedTickets">
        </app-ticket-item-list>

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

    <app-pofiling-box [profile]="profile$ | async">
    </app-pofiling-box>
  `,
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;

  product$: Observable<Product>;
  profile$: Observable<Profile>;

  constructor(private route: ActivatedRoute,
              private sb: SandboxService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.product$ = this.sb.getProduct(this.id);
       this.profile$ = this.sb.getProductProfile(this.id);
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
