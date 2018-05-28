import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ParamsSet, Frame } from '../interfaces/interfaces';

@Component({
  selector: 'new-plot',
  template: `
    <div #plot>

    </div>
  `,
  styles: [``]
})
export class newPlotComponent implements OnInit {
  @Input() paramsSet: ParamsSet;
  @Input() signal: (bits: number[]) => void;
  @Input() modulation: () => void;

  @ViewChild('plot') plotObject: ElementRef;

  frames: Frame[] = [];
  constructor() { }

  ngOnInit() {
    this.plotObject = this.plotObject.nativeElement;
    this.harmonic();
    this.signal(this.paramsSet.bits);
    this.modulation();
    this.funtionPlot();
  }

  makeFrame(name: string) {
    let result = this.frames.find((frame: Frame) => frame.name === name);
    if (result !== undefined) return result;
    else {
      this.frames.push({ name: name, data: [{ x: [], y: [] }] });
      return this.frames[this.frames.length - 1];
    }
  }

  harmonic() {
    const frame = this.makeFrame('harmonic');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
      frame.data[0].x[i] = t * this.paramsSet.scale;
      frame.data[0].y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI);
    }
  }

  getFrame(...args: string[]) {
    if (args.length === 0) return [{ x: [], y: [], line: { simplify: false } }];
    let result = [];
    args.forEach((arg: string) => {
      const frame = this.frames.find((frame: Frame) => frame.name === arg);
      result.push({
        x: frame.data[0].x,
        y: frame.data[0].y,
        name: arg,
        line: { simplify: false }
      })
    });
    return result;
  }

  funtionPlot() {
    Plotly.plot(this.plotObject, this.getFrame('harmonic', 'signal', 'modulation'), {
      autosize: true,
      title: this.paramsSet.name
    }, { displayModeBar: true });
  }
}

