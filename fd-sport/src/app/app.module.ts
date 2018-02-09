import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// angular material
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

// my containers
import { HomeComponent } from './containers/home/home.component';
import { SearchComponent } from './containers/search/search.component';
import { MyClubsComponent } from './containers/my-clubs/my-clubs.component';

// my components
import { HeaderComponent } from './components/header/header.component';
import { TileEventComponent } from './components/tile-event/tile-event.component';
import { TicketItemComponent } from './components/ticket-item/ticket-item.component';
import { ProductItemComponent } from './components/product-item/product-item.component';


// my routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my-clubs', component: MyClubsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    MyClubsComponent,
    TileEventComponent,
    TicketItemComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // routes
    RouterModule.forRoot(appRoutes),
    //angular material
    MatButtonModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
