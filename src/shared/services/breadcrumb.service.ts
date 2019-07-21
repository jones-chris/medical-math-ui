import {Injectable} from '@angular/core';
import {Breadcrumb} from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumbs: Breadcrumb[] = [];

  constructor() {}

  get breadcrumbs(): Breadcrumb[] {
    return this._breadcrumbs;
  }
}
