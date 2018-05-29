import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamsSet, Frame } from '../interfaces/interfaces';
import { newPlotComponent } from '../new-plot/new-plot.component';

@Component({
  selector: 'control-panel',
  template: `
    <!--<new-plot #plot [paramsSet]="paramsSet" [signal]="signal" [modulation]="bpsk"></new-plot>-->
  `,
  styles: [``]
})
export class ControlPanelComponent implements OnInit {
  [x: string]: any;
  bits: number[] = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1];
  paramsSet: ParamsSet = new ParamsSet({name: 'BPSK', bits: this.bits, frequency: 50, periods: 50});
  @ViewChild('plot') plot: newPlotComponent;

  constructor() { }

  ngOnInit() {
  }

  signal(bits) {
    const timeToBit = Math.floor(this.paramsSet.samplingRate / bits.length);
    let index = -1;
    const frame = this.makeFrame('signal'); // ciekawe, działa można tez przez index signature this['makeFrame']('signal');

    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        frame.data[0].x[i] = t * this.paramsSet.scale;
      if (i % (timeToBit / this.paramsSet.scale) === 0) {
        index++;
        if (!bits[index]) bits[index] = -1;
      }
      frame.data[0].y[i] = bits[index];
    }
  }

  bpsk() {
    const harmonicFrame = this.makeFrame('harmonic');
    const signalFrame = this.makeFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    console.log(harmonicFrame,signalFrame,modulationFrame)
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        modulationFrame.data[0].x[i] = t * this.paramsSet.scale;
        modulationFrame.data[0].y[i] = harmonicFrame.data[0].y[i] * signalFrame.data[0].y[i];
    }
  }

  qpsk() { // nie testowane
    const signalFrame = this.makeFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
      modulationFrame.data[0].x[i] = t * this.paramsSet.scale;

      modulationFrame.data[0].y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI + Math.PI/4 + 2 * signalFrame.data[0].y[i] * Math.PI / 4);
    }
  }

  qam() {
    const signalFrame = this.makeFrame('signal');
    const modulationFrame = this.makeFrame('modulation');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        modulationFrame.data[0].x[i] = t * this.paramsSet.scale;


      }
  }

}
