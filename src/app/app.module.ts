import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule } from '@angular/material';
import {MatCardModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { FormulaService } from '../shared/services/formula.service';

import { AppComponent } from './app.component';
import { FormulaComponent } from './formula/formula.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: 'formulas/:id',
    component: FormulaComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FormulaComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatCardModule
  ],
  providers: [
  	FormulaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
	
}
