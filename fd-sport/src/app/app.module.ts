import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// angular material
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
//exeternal modules
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

// my containers
import { HomeComponent } from './containers/home/home.component';
import { SearchComponent } from './containers/search/search.component';
import { MyClubsComponent } from './containers/my-clubs/my-clubs.component';

// my components
import { HeaderComponent } from './components/header/header.component';
import { TileEventComponent } from './components/tile-event/tile-event.component';
import { TicketItemComponent } from './components/ticket-item/ticket-item.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';

// my services
import { SandboxService } from './services/sandbox.service';
import { TileClubComponent } from './components/tile-club/tile-club.component';
import { TileCompetitionComponent } from './components/tile-competition/tile-competition.component';


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
    ProductItemComponent,
    ProductItemListComponent,
    TileClubComponent,
    TileCompetitionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // routes
    RouterModule.forRoot(appRoutes),
    //angular material
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    // exeternal modules
    Ng2CarouselamosModule
  ],
  providers: [ SandboxService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
