import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, SimpleChange, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { ParamsSet, Frame, bit, Plot, Modulation } from '../interfaces/interfaces';

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
  modulations = ['BPSK', 'QPSK', 'QAM8', 'QAM16', 'QAM64']
  windowHeight;
  constructor() { }

  ngOnInit() {
    this.plotObject = this.plotObject.nativeElement;
    this.resetPlotData();
  }


  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.paramsSet['bits'];
    this.resetPlotData();
  }

  private async resetPlotData() {
    await this.invokeModulation('BPSK');
    await this.invokeModulation('QPSK');
    await this.funtionPlot();
    this.windowHeight =  await document.body.scrollHeight + 'px'
    document.getElementById("container").style.height =  this.windowHeight;
  }

  private async invokeModulation(modulationType: Modulation.ModulationType) {
    this.signal(await this.paramsSet.bits, modulationType);
    this.harmonic(modulationType);
    this[modulationType.toLocaleLowerCase()]();
    this.setPlots(modulationType);
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

  setPlots(modulationType: Modulation.ModulationType) {
    const framesArray = [
      this.getFrame(`harmonic${modulationType}`),
      this.getFrame(`signal${modulationType}`),
      this.getFrame(modulationType)
    ];

    let plot = this.makePlots(modulationType);
    framesArray.forEach((frame, i) => {
      plot.data[i].x = frame.x;
      plot.data[i].y = frame.y;
    });
  }

  getFrames(...args: string[]) {
    if (args.length === 0) return [{ x: [], y: [], line: { simplify: false } }];
    let result = [];
    const names = ['harmonic', 'signal', 'modulation'];
    args.forEach((arg: string, i) => {
      const frame = this.frames.find((frame: Frame) => frame.name === arg);
      result.push({
        x: frame.x,
        y: frame.y,
        name: names[i],
        line: { simplify: false }
      });
    });
    return result;
  }

  funtionPlot() {
    Plotly.purge(this.plotObject);
    Plotly.plot(this.plotObject, this.getFrames('harmonicBPSK', 'signalBPSK', 'BPSK'), {
      yaxis: { range: [-2,2] },
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
      { method: 'animate', args: [['BPSK']], label: 'BPSK' },
      { method: 'animate', args: [['QPSK']], label: 'QPSK' },
    ]
  }];

  @HostListener('window:resize', ['$event'])
  resize(): void {
    Plotly.Plots.resize(document.getElementById('plot'));
  }

  // region bpsk API
  harmonic(modulationType: Modulation.ModulationType) {
    const harmonic = this.makeFrame(`harmonic${modulationType}`);
    const signal = this.getFrame(`signal${modulationType}`);
    harmonic.x = signal.x;
    for (let i = 0, t = i;
      i < harmonic.x.length; // [WARNING] może się wywalić przy nieparzystych
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * 1000 * 1000 * this.paramsSet.signalFrequency)) {
      harmonic.x[i] = t * this.paramsSet.scale;
      harmonic.y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI * 1000 * 1000);
    }
  }

  signal(bits: bit[], modulationType: Modulation.ModulationType) {
    const signal = this.makeFrame(`signal${modulationType}`);
    let index = 0;
    let t = 0;
    let bitBufor = [];
    let symbolValue;
    for (let bit of bits) { // dla kazdego bitu
      bitBufor.push(bit); // pushnij bita do bufora
      if (bitBufor.length === Modulation[modulationType].bitPerSymbol) { // sprawdz czy bufor juz jest dostatecznie dlugi
        symbolValue = 0;
        bitBufor.forEach((bit: bit, i) => symbolValue += bit * 2**(Modulation[modulationType].bitPerSymbol - i - 1)); // każdy bit razy 2^(dlugosc bufora - iterator - 1) np dla qpsk [1,0] 1 * 2^1 + 0 * 2^0
        for (let i = 0; i < this.paramsSet.samplingRate; i++ , t += 1 / this.paramsSet.samplingRate / this.paramsSet.signalFrequency / 1000 / 1000, index++) {
          signal.x[index] = t * this.paramsSet.scale;
          if (bit == 0 && modulationType === 'BPSK') signal.y[index] = -1; // == operator because of string type of input data
          else signal.y[index] = symbolValue;
        }
        bitBufor = [];
      }
    }
    // [TODO] Popraw ten wyjątek, może coś wydziel ???
    if (bitBufor.length){
      for(let i = bitBufor.length; i < Modulation[modulationType].bitPerSymbol; i++) bitBufor.push(0);
      bitBufor.forEach((bit: bit, i) => symbolValue += bit * 2**(Modulation[modulationType].bitPerSymbol - i - 1));
      for (let i = 0; i < this.paramsSet.samplingRate; i++ , t += 1 / this.paramsSet.samplingRate / this.paramsSet.signalFrequency / 1000 / 1000, index++) {
        signal.x[index] = t * this.paramsSet.scale;
        signal.y[index] = symbolValue;
      }
    }
    
  }

  bpsk() {
    const harmonicFrame = this.getFrame('harmonicBPSK');
    const signalFrame = this.getFrame('signalBPSK');
    const bpskFrame = this.makeFrame('BPSK');

    bpskFrame.x = signalFrame.x; // or harmnicFrame.data.x
    signalFrame.x.forEach((sample, i) => {
      bpskFrame.y[i] = harmonicFrame.y[i] * signalFrame.y[i];
    });
  }

  qpsk() { // wymaga nowego sygnału
    const signalFrame = this.getFrame('signalQPSK');
    const modulationFrame = this.makeFrame('QPSK');

    modulationFrame.x = signalFrame.x;

    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate * this.paramsSet.bits.length;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * 1000 * 1000)) {
      modulationFrame.y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI * 1000 * 1000 + Math.PI / 4 + 2 * signalFrame.y[i] * Math.PI / 4);
    }
  }

  // endregion
}


