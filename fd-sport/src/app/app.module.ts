import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// angular material
import {MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
//external modules
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

// my containers
import { HomeComponent } from './containers/home/home.component';
import { SearchComponent } from './containers/search/search.component';
import { MyClubsComponent } from './containers/my-clubs/my-clubs.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { TicketPageComponent } from './containers/ticket-page/ticket-page.component';
import { GoodDealsPageComponent } from './containers/good-deals-page/good-deals-page.component';

// my components
import { HeaderComponent } from './components/header/header.component';
import { TileEventComponent } from './components/tile-event/tile-event.component';
import { TicketItemComponent } from './components/ticket-item/ticket-item.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';
import { TileClubComponent } from './components/tile-club/tile-club.component';
import { TileCompetitionComponent } from './components/tile-competition/tile-competition.component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { TileGoodDealsComponent } from './components/tile-good-deals/tile-good-deals.component';

// my services
import { SandboxService } from './services/sandbox.service';
import { EventPageComponent } from './containers/event-page/event-page.component';
import { CompetitionPageComponent } from './containers/competition-page/competition-page.component';
import { ClubPageComponent } from './containers/club-page/club-page.component';
import { TicketItemListComponent } from './components/ticket-item-list/ticket-item-list.component';
import { MapComponent } from './components/map/map.component';




// my routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my-clubs', component: MyClubsComponent },

  { path: 'product/:id', component: ProductPageComponent },
  { path: 'ticket/:id', component: TicketPageComponent },

  { path: 'event/:id', component: EventPageComponent },
  { path: 'competition/:id', component: CompetitionPageComponent },
  { path: 'club/:id', component: ClubPageComponent },
  { path: 'good-deals', component: GoodDealsPageComponent }
];

@NgModule({
  declarations: [
    // my containers
    HomeComponent,
    SearchComponent,
    MyClubsComponent,
    ProductPageComponent,
    TicketPageComponent,
    EventPageComponent,
    CompetitionPageComponent,
    ClubPageComponent,
    GoodDealsPageComponent,
    // my components
    AppComponent,
    HeaderComponent,
    TileEventComponent,
    TicketItemComponent,
    ProductItemComponent,
    ProductItemListComponent,
    TileClubComponent,
    TileCompetitionComponent,
    SidenavMenuComponent,
    TileGoodDealsComponent,
    TicketItemListComponent,
    MapComponent,
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
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // exeternal modules
    Ng2CarouselamosModule,
  ],
  providers: [ SandboxService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
