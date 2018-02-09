import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template:`
    <app-tile-event>
    </app-tile-event>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
