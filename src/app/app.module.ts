import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { newPlotComponent } from './new-plot/new-plot.component';
import { TheoryComponent } from './theory/theory.component';
import { CHeaderComponent } from './ctooltip/ctooltip.component';
import { ConstllationsComponent } from './theory/constellations/constellations.component';


@NgModule({
  declarations: [
    AppComponent,
    newPlotComponent,
    TheoryComponent,
    CHeaderComponent,
    ConstllationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
