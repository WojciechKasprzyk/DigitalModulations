import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { PlotComponent } from './plot/plot.component';
import { newPlotComponent } from './new-plot/new-plot.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';



@NgModule({
  declarations: [
    AppComponent,
    PlotComponent,
    newPlotComponent,
    ControlPanelComponent
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
