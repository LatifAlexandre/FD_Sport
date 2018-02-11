import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandboxService } from '../../services/sandbox.service';
import { Product } from '../../types/Product.class';

@Component({
  selector: 'app-product-page',
  template: `
    <h2> {{ product.name }} </h2>

    <div class="picture-and-price">

      <img [src]="product.pictureLink" class="product-picture">

      <div class="right">
        <div class="prices">
          <div class="initial-price">
            {{ product.price.initialPrice }} €
          </div>
          <div class="price">
            {{ product.price.getReducedPrice() }} €
          </div>
        </div>
      </div>

    </div>

    <div class="messages">
    Il ne rest plus que {{ product.stock }} exemplaires ! <br>
    Livraison en 24h
    </div>

    <button mat-raised-button class="buy-btn"> Acheter </button>

    <div class="description">
      <h3>description</h3>
      <p>
        {{ product.description}}
      </p>
    </div>

    <h3> produits accociés </h3>

    <app-product-item-list [products]="product.relatedProducts">
    </app-product-item-list>

    <app-ticket-item-list [tickets]="product.relatedTickets">
    </app-ticket-item-list>

    <div class="comments">
      comentaires
    </div>

    <div class="questions">
      questions
    </div>
  `,
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;

  product: Product;

  constructor(private route: ActivatedRoute,
              private sb: SandboxService) {
      this.product = this.sb.getProduct(this.id);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
