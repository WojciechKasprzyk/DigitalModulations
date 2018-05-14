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
  bits: number[] = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1];  // @Input() lub service 
  frames: Frame[] = [
    { name: 'sine', data: [{ x: [], y: [] }] },
    { name: 'square', data: [{ x: [], y: [] }] },
    { name: 'bpsk', data: [{ x: [], y: [] }] },
  ];
  private scale = 2;
  private _frequency;
  set frequency(f: number) {
    this._frequency = f * 2;
  }
  get frequency() {
    return this._frequency;
  }
  private samplingRate = 1400;    // 700 to optymalne rozwiązanie
  private _periods: number;
  set periods(p: number) {
    this._periods = p * 2;
  }
  get periods() {
    return this._periods;
  }

  constructor() { }

  ngOnInit() {
    this.plotObject = this.plotObject.nativeElement;
    // parameters setters
    this.periods = 50;
    this.frequency = 50;

    this.funtionPlot();
  }



  harmonic() {
    for (let i = 0, t = i;
      i < this.samplingRate;
      i++ , t = i / ((this.samplingRate - 1) * this.frequency) * this.periods) {

      // A sine wave:
      this.frames[0].data[0].x[i] = t * this.scale;
      this.frames[0].data[0].y[i] = Math.sin(t * this.frequency * Math.PI);
    }
  }

  /*
  * A L G O R Y T M   K O R E K C Y J N Y
  * floorowanie ucina kilka bitów
  * trzeba je uzupełnić po całym procesie
  */
  addBit(bits) {
    const timeToBit = Math.floor(this.samplingRate / bits.length);
    let index = -1;

    for (let i = 0, t = i;
      i < this.samplingRate;
      i++ , t = i / ((this.samplingRate - 1) * this.frequency) * this.periods) {
      this.frames[1].data[0].x[i] = t * this.scale;
      if (i % timeToBit === 0) {
        index++;
        if(!bits[index]) bits[index]=-1; 
      }
      this.frames[1].data[0].y[i] = bits[index];
    }
  }

  bpsk() {
    for (let i = 0, t = i;
      i < this.samplingRate;
      i++ , t = i / ((this.samplingRate - 1) * this.frequency) * this.periods) {
        this.frames[2].data[0].x[i] = t * this.scale;
        this.frames[2].data[0].y[i] = this.frames[0].data[0].y[i] * this.frames[1].data[0].y[i];
      }
  }




  funtionPlot() {
    const bits = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1]
    this.addBit(bits);

    this.harmonic();

    this.bpsk();

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
            { method: 'animate', args: [['square']], label: 'square' },
            { method: 'animate', args: [['bpsk']], label: 'bpsk' },
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
