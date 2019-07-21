import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbArray: string[] = [];

  constructor() {}

  get breadcrumbs(): string[] {
    return this.breadcrumbArray;
  }
}
