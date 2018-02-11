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
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';


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
    TileCompetitionComponent,
    SidenavMenuComponent
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
    Ng2CarouselamosModule
  ],
  providers: [ SandboxService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
