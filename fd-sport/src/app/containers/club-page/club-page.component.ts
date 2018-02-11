import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandboxService } from '../../services/sandbox.service';
import { Club } from '../../types/Club.class';


@Component({
  selector: 'app-club-page',
  template: `
  <h2> 
    <img [src]="club.pictureLink" >
    {{ club.name }}

    <button mat-icon-button color="accent">
      <i *ngIf="!club.favorite" class="material-icons favorite-btn">star_border </i>
      <i *ngIf="club.favorite" class="material-icons favorite-btn">star</i>
    </button>
  </h2>

  <h3> Les prochains évènements </h3>

  <app-ticket-item-list [tickets]="club.tickets">
  </app-ticket-item-list>
  
  <h3> les produits du club </h3>

  <app-product-item-list [products]="club.products">
  </app-product-item-list>

  <h3> Carte </h3>
  
  <iframe class="map"
    height="300"
    width="100%"
    frameborder="0" style="border:0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBErQrtVUDeCDkFJtS03FBawy0raDrre98
      &q=marseille">
  </iframe>

`,
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit {

  id: string;
  private sub: any;

  club: Club;

  constructor(private route: ActivatedRoute,
              private sb: SandboxService) {
    this.club = this.sb.getClub(this. id);
    console.log(this.club)
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
