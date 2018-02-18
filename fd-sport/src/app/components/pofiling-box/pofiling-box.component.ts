import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pofiling-box',
  template: `

    <h5> id number {{ profile?.id }} </h5>
    <div class="axe" *ngFor="let axe of profile?.axes">
      <div class="name">
      {{axe?.name}}
      </div>
      <div class="value">
      {{ axe?.value * 100 }}%
      </div>
      
      
    </div>
    `,
  styleUrls: ['./pofiling-box.component.scss']
})
export class PofilingBoxComponent implements OnInit {

  @Input() profile;

  constructor() { }

  ngOnInit() {
    
  }

}
