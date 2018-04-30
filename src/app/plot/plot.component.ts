import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'plot',
  template: `
    <div #plot>

    </div>
  `,
  styleUrls: ['./plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush   // jak by się coś waliło to przez to :3 z rx'a
})
export class PlotComponent implements OnInit {
  @ViewChild('plot') plotObject: ElementRef;
  frames: Frame[] = [
    { name: 'sine', data: [{ x: [], y: [] }] },
    { name: 'cosine', data: [{ x: [], y: [] }] },
    { name: 'circle', data: [{ x: [], y: [] }] },
    { name: 'square', data: [{ x: [], y: [] }] },
  ];
  private _frequency;
  set frequency(f:number) {
    this._frequency = f*2;
  }
  get frequency() {
    return this._frequency;
  }
  samplingRate = 100 * 3.14;
  private _periods: number;
  set periods(p:number) {
    this._periods = p*2;
  }
  get periods() {
    return this._periods;
  }

  constructor() { }

  ngOnInit() {
    this.plotObject = this.plotObject.nativeElement;
    this.funtionPlot();
  }

  // addBit(bit: 0 | 1, , array) {
  //   for (let i = 0; i < ; i++)
  // }

  funtionPlot() {
    /*
    * frequency - czestotliwość
    * samplingRate - gęstość dyskretyzcji, np 100 próbek na sekunde
    * 
    *
    */
    this.periods = 1;
    this.frequency = 2
    let sign = 1;

    const bits = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1]
    for (let i = 0; i < this.samplingRate; i++) {
      const t = i / ((this.samplingRate - 1)*this.frequency) * this.periods;

      // A sine wave:
      this.frames[0].data[0].x[i] = t * Math.PI;
      this.frames[0].data[0].y[i] = Math.sin(t * this.frequency * Math.PI);

      // A cosine wave:
      this.frames[1].data[0].x[i] = t * Math.PI;
      this.frames[1].data[0].y[i] = 1 / 2 * Math.cos(2 * t * Math.PI) + 1 / 2 * Math.sin(t * Math.PI + Math.PI / 4);

      // A circle:
      this.frames[2].data[0].x[i] = Math.sin(t * Math.PI);
      this.frames[2].data[0].y[i] = Math.cos(t * Math.PI);

      // A square:
      if (i % 100 === 0) sign *= (-1);
      this.frames[3].data[0].x[i] = t * Math.PI;
      this.frames[3].data[0].y[i] = sign;
    }

    // for (const bit of bits) this.addBit(bit,frequency,this.frames[0].data[0].y);

    Plotly.plot(this.plotObject, [{
      x: this.frames[0].data[0].x,
      y: this.frames[0].data[0].y,
      line: { simplify: false },
    }], {
        // xaxis: { range: [0, periodsNumber * frequency * Math.PI] },
        // yaxis: { range: [-1.2, 1.2] },
        autosize: true,
        title: 'wykres',
        updatemenus: [{
          type: 'buttons',
          buttons: [
            { method: 'animate', args: [['sine']], label: 'sine' },
            { method: 'animate', args: [['cosine']], label: 'cosine' },
            { method: 'animate', args: [['circle']], label: 'circle' },
            { method: 'animate', args: [['square']], label: 'square' }
          ]
        }],
      }, { displayModeBar: true }).then(() => {
        Plotly.addFrames(this.plotObject, this.frames);
      });
  }
}


interface PlotSecondParam {
  xaxis?: { range: number[] };
  yaxis?: { range: number[] };
  autosize?: boolean; //może zastąpić xaxis i yaxis
  paper_bgcolor?: string; //kolor ramki wykresu, color like #fff
  plot_bgcolor?: string; //kolor tła wykresu <--- spoko do widoku nocnego :D
  title?: string;
  titlefont?: {
    family?: string, //HTML font family
    size?: number, // >=0
    color?: string //#fff
  }
  margin?: {
    l?: number,
    r?: number,
    t?: number,
    b?: number,
    pad?: number,
    autoexpand?: boolean
  }

  updatemenus?: Array<{
    type?: "dropdown" | "buttons",
    buttons?: Array<{
      method: "restyle" | "relayout" | "animate" | "update" | "skip",  // ale działa tylko animate ... :/
      args: string[][],
      label: string,
      execute?: boolean
    }>
  }>
}


interface Frame {
  name: string;
  data: Array<{ x?: number[], y: number[] }>;
}
