import { Component, OnInit, Input } from '@angular/core';
import { Competition } from '../../types/Competition.class';

@Component({
  selector: 'app-tile-competition',
  template: `
    <mat-expansion-panel expanded="true">
  
      <mat-expansion-panel-header collapsedHeight="80px" expandedHeight="80px" >
      <mat-panel-title>
        <div class="picture">
          <img [src]="competition.pictureLink" alt="" class="header-picture">
        </div>

        <div class="info">
          <div class="title"> {{ competition.name }} </div>
          <div class="date">
            Du {{ competition.startDate | date:'shortDate' }} au {{ competition.endDate | date:'shortDate' }}.
          </div>
        </div>
      </mat-panel-title>

        
      </mat-expansion-panel-header>
  
      <div class="panel-body">
    
        <app-product-item-list [products]="competition.products">
        </app-product-item-list>
  
        <button mat-raised-button color="primary" class="more-info-btn" [routerLink]="['/competition', competition.id]">
         Voir la compétition 
        </button>
      </div>
  
    </mat-expansion-panel >
  
  `,
  styleUrls: ['./tile-competition.component.scss']
})
export class TileCompetitionComponent implements OnInit {

  @Input() competition: Competition;

  constructor() { }

  ngOnInit() {
    console.log(this.competition)
  }

}
