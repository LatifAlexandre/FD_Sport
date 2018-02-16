import { Observable } from 'rxjs/Observable';
import { User } from './../../types/User.class';
import { SandboxService } from './../../services/sandbox.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  template:`
  <div class="content">
    <!--
    <h2> Connexion </h2>
    <div class="form-connexion">
      <mat-form-field>
        <input matInput placeholder="pseudonyme">
      </mat-form-field>
      <br>
      <mat-form-field>
      <input matInput placeholder="mot de passe">
      </mat-form-field>
      <br>
      <button mat-raised-button color="primary">
        Connexion
      </button>
    </div>
    -->

    <h2> Connexion rapide </h2>

    <mat-card class="fast-login-card" *ngFor="let user of users$ | async">
      <h4> {{ user?.username }}, id {{ user?.id }} </h4>

      <button mat-raised-button color="primary" (click)="fastLogin(user)">
        Connexion rapide
      </button>

    </mat-card>



    
    
  </div>
  
  `,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private sb: SandboxService) {
    this.users$ = this.sb.getAllUsers()
  }

  ngOnInit() {
  }

  fastLogin(user: User) {
    this.sb.login(user);
  }

}
