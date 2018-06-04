import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, SimpleChange, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { ParamsSet, Frame, bit, Plot } from '../interfaces/interfaces';

@Component({
  selector: 'new-plot',
  template: `
    <div #plot id="plot"></div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class newPlotComponent implements OnInit {
  @Input() paramsSet: ParamsSet;
  @ViewChild('plot') plotObject: ElementRef;

  frames: Frame[] = [];
  plots: Plot[] = [];
  constructor() { }

  ngOnInit() {
    this.plotObject = this.plotObject.nativeElement;
    this.resetPlotData();
  }


  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.paramsSet['bits'];
    this.resetPlotData()
  }

  private async resetPlotData() {
    this.signal(this.paramsSet.bits);
    this.harmonic();
    this.bpsk();
    await this.funtionPlot();
  }

  getFrame(name: string): Frame {
    let result = this.frames.find((frame: Frame) => frame.name === name);
    if (result !== undefined) return result;
    else throw (`cannot find frame called: ${name}`);
  }

  makeFrame(name: string): Frame {
    let index = this.frames.findIndex((frame: Frame) => frame.name === name);
    if (index !== -1) this.frames.splice(index, 1);
    this.frames.push({ name: name, x: [], y: [] });
    return this.frames[this.frames.length - 1];
  }

  makePlots(name: string): Plot {
    let index = this.plots.findIndex((plot: Plot) => plot.name === name);
    if (index !== -1) this.plots.splice(index, 1);
    this.plots.push(
      { name: name,
        data: [
          {x: [], y: []},
          {x: [], y: []},
          {x: [], y: []}
        ]
      });
    return this.plots[this.plots.length - 1];
  }

  getFrames(...args: string[]) {
    if (args.length === 0) return [{ x: [], y: [], line: { simplify: false } }];
    let result = [];
    args.forEach((arg: string) => {
      const frame = this.frames.find((frame: Frame) => frame.name === arg);
      result.push({
        x: frame.x,
        y: frame.y,
        name: arg,
        line: { simplify: false }
      });
    });
    return result;
  }

  funtionPlot() {
    Plotly.purge(this.plotObject);
    Plotly.plot(this.plotObject, this.getFrames('harmonic', 'signal', 'bpsk'), {
      autosize: true,
      title: this.paramsSet.name,
      paper_bgcolor: '#f3f3f3',
      plot_bgcolor: '#f3f3f3',
      updatemenus: this.updateMenu,
    }, { displayModeBar: true })
    .then(() => {
      Plotly.addFrames(this.plotObject, this.plots);
    });
  }

  private updateMenu = [{
    // y: -1.1,
    // direction: 'right',
    // // xanchor: 'bottom',
    type: 'buttons',
    buttons: [
      { method: 'animate', args: [['bpsk']], label: 'bpsk' },
    ]
  }];

  @HostListener('window:resize', ['$event'])
  resize(): void {
    Plotly.Plots.resize(document.getElementById('plot'));
  }

  // region bpsk API
  harmonic() {
    const harmonic = this.makeFrame('harmonic');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate * this.paramsSet.bits.length;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * 1000 * 1000 * this.paramsSet.signalFrequency)) {
      harmonic.x[i] = t * this.paramsSet.scale;
      harmonic.y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI * 1000 * 1000);
    }
  }

  signal(bits: bit[]) {
    const signal = this.makeFrame('signal');
    let index = 0;
    let t = 0;
    for (let bit of bits) {
      for (let i = 0; i < this.paramsSet.samplingRate; i++ , t += 1 / this.paramsSet.samplingRate / this.paramsSet.signalFrequency / 1000 / 1000, index++) {
        signal.x[index] = t * this.paramsSet.scale;
        if (bit == 0) signal.y[index] = -1; // == operator because of string type of input data
        else signal.y[index] = 1;
      }
    }
  }

  bpsk() {
    const harmonicFrame = this.getFrame('harmonic');
    const signalFrame = this.getFrame('signal');
    const bpskFrame = this.makeFrame('bpsk');

    bpskFrame.x = signalFrame.x; // or harmnicFrame.data.x
    signalFrame.x.forEach((sample, i) => {
      bpskFrame.y[i] = harmonicFrame.y[i] * signalFrame.y[i];
    });

    let plot = this.makePlots('bpsk');
    plot.data[0].x = harmonicFrame.x;
    plot.data[0].y = harmonicFrame.y;

    plot.data[1].x = signalFrame.x;
    plot.data[1].y = signalFrame.y;

    plot.data[2].x = bpskFrame.x;
    plot.data[2].y = bpskFrame.y;
    console.log(this.plots)
  }

  // endregion
}


