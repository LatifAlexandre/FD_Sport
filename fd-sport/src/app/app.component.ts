import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  template: `
      <app-header (clickOnMenuBtn)="onClickOnMenuBtn()">
      </app-header>
  
      <mat-sidenav-container [style.paddingTop.px]="headerHeight">
        <mat-sidenav  [opened]="sideNavOpened"
                      (closedStart)="onSideNavCLosed()"
                      [style.marginTop.px]="headerHeight">
          <app-sidenav-menu (linkClicked)="onSideNavMenuLinkClicked()">
          </app-sidenav-menu>
        </mat-sidenav>
        <mat-sidenav-content >
          <div class="container">
            <router-outlet ></router-outlet>
          </div>
        </mat-sidenav-content>
    
      </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(HeaderComponent, {read: ElementRef}) header: ElementRef;

  sideNavOpened: boolean = false;
  headerHeight: number;
  

  constructor() {}

  ngAfterViewInit() {
    // the setTimeout is a workaround solution 
    // to prevent ExpressionChangedAfterItHasBeenCheckedError
    setTimeout( () => {
      this.headerHeight = this.header.nativeElement.clientHeight;
    }, 100)

     
    
  }

  onSideNavMenuLinkClicked() {
    this.sideNavOpened = false;
  }
  
  onClickOnMenuBtn() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  onSideNavCLosed() {
    this.sideNavOpened = false;
  }

}

