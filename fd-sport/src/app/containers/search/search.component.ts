import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `


    <div class="form-body">
      
      <mat-form-field>
        <input matInput placeholder="Rechercher">
      </mat-form-field>
      <br>
  
      <!-- sport / club -->
      
      <mat-form-field>
        <mat-select placeholder="Sport">
          <mat-option *ngFor="let sport of sports" [value]="sport">
            {{ sport }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      
      <mat-form-field>
        <mat-select placeholder="Club">
          <mat-option *ngFor="let club of clubs" [value]="club">
            {{ club }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    
  
      <!-- prix -->
  
      <mat-form-field>
        <input type="number" matInput placeholder="Prix min">
      </mat-form-field>
  
      <mat-form-field>
        <input type="number" matInput placeholder="Prix max">
      </mat-form-field>
  
      <!-- date -->
  
      <mat-form-field>
        <input matInput [matDatepicker]="picker" placeholder=" à partir de la date">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <br>

      <!-- lieu -->

      <label> A proximité de : </label>
      
      
    </div>

    

    <div class="form-footer">
      <button class="search-btn" mat-raised-button color="primary"> Rechercher </button>
    </div>

    <app-map [keywords]="'france'">
    </app-map>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  sports: any[] = [ 'football', 'basketball', 'tennis'];
  clubs: any[] = [ 'Olympique de Marseille', 'Paris Saint Germains'];

  constructor() { }

  ngOnInit() {
  }

}
