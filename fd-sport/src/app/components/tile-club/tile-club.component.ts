import { Component, OnInit, Input } from '@angular/core';
import { Club } from '../../types/Club.class';

@Component({
  selector: 'app-tile-club',
  template:`
  <mat-expansion-panel expanded="true">

    <mat-expansion-panel-header collapsedHeight="80px" expandedHeight="80px" >
      <mat-panel-title>
        
      <button mat-icon-button color="accent">
      <i *ngIf="!club.favorite"
            class="material-icons favorite-btn">star_border
      </i>
      <i *ngIf="club.favorite" 
            class="material-icons favorite-btn">star</i>
      </button>
        
        <div class="title"> {{ club.name }} </div>
      </mat-panel-title>
    </mat-expansion-panel-header>

    <div class="panel-body">
  
      <app-product-item-list [products]="club.products"
                           [width]="300">
      </app-product-item-list>

      <button mat-raised-button color="primary" class="more-info-btn">
       Voir le Club 
      </button>
    </div>

  </mat-expansion-panel >
  `,
  styleUrls: ['./tile-club.component.scss']
})
export class TileClubComponent implements OnInit {

  @Input() club: Club;

  constructor() { }

  ngOnInit() {
    console.log(this.club)
  }

}
