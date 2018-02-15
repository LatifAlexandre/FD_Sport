import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `
  <iframe 
  class="map"
  height="300"
  width="100%"
  frameborder="0"
  style="border:0"
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBErQrtVUDeCDkFJtS03FBawy0raDrre98
    &q=marseille">
  </iframe>
  
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() keywords: string;
  key: string = 'AIzaSyBErQrtVUDeCDkFJtS03FBawy0raDrre98';
  src: string;


  constructor() {
   
  }
  
  ngOnInit() {
    this.src = `https://www.google.com/maps/embed/v1/place?key=${this.key}&q=${this.keywords}`
  }

}
