import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private _refAppComponent: AppComponent) {}

  get refAppComponent(): AppComponent {
    return this._refAppComponent;
  }

  ngOnInit() {
  }

}
