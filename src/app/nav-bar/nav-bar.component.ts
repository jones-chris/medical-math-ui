import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isSignedIn = false;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              public refAppComponent: AppComponent) {
  }

  ngOnInit() {
  }

  toggleIsSignedIn(): void {
    this.isSignedIn = !this.isSignedIn;
  }

}
