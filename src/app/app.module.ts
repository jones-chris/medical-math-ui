import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FormulaService } from '../shared/services/formula.service';

import { AppComponent } from './app.component';
import { FormulaComponent } from './formula/formula.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FormulaComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
  	FormulaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
	
}
