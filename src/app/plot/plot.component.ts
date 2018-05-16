import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';
import * as _ from 'lodash';


/* Fajne z cisco
 * http://www.erenfe.com/uploads/4/8/5/0/4850484/qpsk_and_16-qam_digital_modulation.pdf
 */

@Component({
  selector: 'plot',
  template: `
    <div #plot>

    </div>
  `,
  styleUrls: ['./plot.component.css'],
})
export class PlotComponent implements OnInit {
  @Input() pramsSet/*: ParamsSet*/;
  @Input() _addBit: (bits) => void;
  @Input() modulation: ()=> void; 
  @ViewChild('plot') plotObject: ElementRef;
  bits: number[] = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1];  // @Input() lub service 
  bitsQPSK = [2, 1, 2, 0/* powinno być 1*/, 1];
  frames: Frame[] = [
    { name: 'sine', data: [{ x: [], y: [] }, { x: [], y: [] }] },
    { name: 'square', data: [{ x: [], y: [] }, { x: [], y: [] }] },
    { name: 'bpsk', data: [{ x: [], y: [] }, { x: [], y: [] }] },
    { name: 'qpsk', data: [{ x: [], y: [] }, { x: [], y: [] }] },
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
      // this.frames[1].data[1].x[i] = t * this.scale;
      // this.frames[1].data[1].y[i] = Math.sin(t * this.frequency * Math.PI);
    }
  }

  /*
  * A L G O R Y T M   K O R E K C Y J N Y
  * floorowanie ucina kilka bitów
  * trzeba je uzupełnić po całym procesie
  */
  addBit(bits, where, where2, scale) {
    const timeToBit = Math.floor(this.samplingRate / bits.length);
    let index = -1;

    for (let i = 0, t = i;
      i < this.samplingRate / scale;
      i++ , t = i / ((this.samplingRate - 1) * this.frequency) * this.periods) {
      this.frames[where].data[where2].x[i] = t * this.scale;
      if (i % (timeToBit/scale) === 0) {
        index++;
        if (!bits[index]) bits[index] = -1;
      }
      this.frames[where].data[where2].y[i] = bits[index];
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

  qpsk() {
    this.addBit(this.bitsQPSK,3,1,2)
    for (let i = 0, t = i;
      i < this.samplingRate / 2;
      i++ , t = i / ((this.samplingRate - 1) * this.frequency) * this.periods) {
      this.frames[3].data[0].x[i] = t * this.scale;

      this.frames[3].data[0].y[i] = Math.sin(t * this.frequency * Math.PI + Math.PI/4 + 2*this.frames[3].data[1].y[i] * Math.PI / 4);
    }
  }


  getFrame(...args: string[]) {
    if (args.length === 0) return [{ x: [], y: [], line: { simplify: false } }];
    let result = [];
    args.forEach((arg: string) => {
      const frame = this.frames.find(frame => frame.name === arg);
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
    this.addBit(this.bits,1,0,1);

    this.harmonic();

    this.bpsk();

    this.qpsk();

    Plotly.plot(this.plotObject, this.getFrame('sine', 'square', 'bpsk'), {
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
          { method: 'animate', args: [['qpsk']], label: 'qpsk' },
        ]
      }],
      layout: {
        sliders: [{
          pad: { t: 30 },
          x: this.frames[0].data[0].x,
          len: 0.95,
          currentvalue: {
            xanchor: 'right',
            prefix: 'name: ',
            font: {
              color: '#888',
              size: 20
            }
          },
          transition: { duration: 500 },
          // By default, animate commands are bound to the most recently animated frame:
          steps: [{
            label: 'red',
            method: 'animate',
            args: [['red'], {
              mode: 'immediate',
              frame: {redraw: false, duration: 500},
              transition: {duration: 500}
            }]
          }, {
            label: 'green',
            method: 'animate',
            args: [['blue'], {
              mode: 'immediate',
              frame: {redraw: false, duration: 500},
              transition: {duration: 500}
            }]
          }, {
            label: 'blue',
            method: 'animate',
            args: [['green'], {
              mode: 'immediate',
              frame: {redraw: false, duration: 500},
              transition: {duration: 500}
            }]
          }]
        }],
      },
      // updatemenus: [{
      //   type: 'buttons',
      //   showactive: false,
      //   x: this.frames[0].data[0].x,
      //   y: 0,
      //   xanchor: 'right',
      //   yanchor: 'top',
      //   pad: {t: 60, r: 20},
      //   buttons: [{
      //     label: 'Play',
      //     method: 'animate',
      //     args: [null, {
      //       fromcurrent: true,
      //       frame: {redraw: false, duration: 1000},
      //       transition: {duration: 500}
      //     }]
      //   }]
      // }],
  }, { displayModeBar: true })
  .then(() => {
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

