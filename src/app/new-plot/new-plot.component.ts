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
    this.resetPlotData(this.paramsSet.name);
  }


  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.paramsSet['bits'];
    this.resetPlotData(this.paramsSet.name);
  }

  private async resetPlotData(modulationType: Modulation.ModulationType) {
    this.signal();
    await this.invokeModulation('BPSK');
    await this.invokeModulation('QPSK');
    await this.invokeModulation('QAM8');
    await this.invokeModulation('QAM16');
    await this.invokeModulation('QAM64');
    // console.log(this.frames)
    await this.funtionPlot(modulationType);
    this.windowHeight = await document.body.scrollHeight + 'px'
    document.getElementById("container").style.height = this.windowHeight;
  }

  private async invokeModulation(modulationType: Modulation.ModulationType) {
    this.harmonic(modulationType);
    if (modulationType !== 'BPSK') this.qam(modulationType);
    else this[modulationType.toLocaleLowerCase()]();
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
      {
        name: name,
        data: [
          { x: [], y: [] },
          { x: [], y: [] },
          { x: [], y: [] }
        ]
      });
    return this.plots[this.plots.length - 1];
  }

  setPlots(modulationType: Modulation.ModulationType) {
    const framesArray = [
      this.getFrame(`harmonic${modulationType}`),
      this.getFrame(`signal`),
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
        xaxis: 'x',
        name: names[i],
        type: 'scatter',
        line: { simplify: false }
      });
    });
    return result;
  }

  funtionPlot(modulationType: Modulation.ModulationType) {
    Plotly.purge(this.plotObject);
    Plotly.plot(this.plotObject, this.getFrames(`harmonic${modulationType}`, 'signal', modulationType), {
      yaxis: { range: [-2, 2] },
      paper_bgcolor: '#f3f3f3',
      plot_bgcolor: '#f3f3f3',
      xanchor: 'x',
      updatemenus: [{
        type: 'buttons',
        active: (() => this.modulations.indexOf(modulationType))(),
        buttons: [
          { method: 'animate', args: [['BPSK']], label: 'BPSK' },
          { method: 'animate', args: [['QPSK']], label: 'QPSK' },
          { method: 'animate', args: [['QAM8']], label: 'QAM8' },
          { method: 'animate', args: [['QAM16']], label: 'QAM16' },
          { method: 'animate', args: [['QAM64']], label: 'QAM64' },
        ]
      }],
    }, { displayModeBar: true })
      .then(() => {
        Plotly.addFrames(this.plotObject, this.plots);
      });
  }

  @HostListener('window:resize', ['$event'])
  resize(): void {
    Plotly.Plots.resize(document.getElementById('plot'));
  }

  // region bpsk API
  harmonic(modulationType: Modulation.ModulationType) {
    const signal = this.getFrame(`signal`);
    const harmonic = this.makeFrame(`harmonic${modulationType}`);
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate * Math.ceil(this.paramsSet.bits.length / Modulation[modulationType].bitPerSymbol); // [WARNING] może się wywalić przy nieparzystych
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * 1000 * 1000 * this.paramsSet.signalFrequency)) {
      harmonic.x[i] = t;
      harmonic.y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI * 1000 * 1000);
    }
  }

  signal() {
    const signal = this.makeFrame(`signal`);
    let index = 0;
    let t = 0;
    for (let bit of this.paramsSet.bits) { // dla kazdego bitu
      for (let i = 0; i < this.paramsSet.samplingRate; i++ , t += 1 / this.paramsSet.samplingRate / this.paramsSet.signalFrequency / 1000 / 1000, index++) {
        signal.x[index] = t;
        if (bit == 0) signal.y[index] = -1; // == operator because of string type of input data
        else signal.y[index] = 1;
      }
    }
  }

  bpsk() {
    const harmonicFrame = this.getFrame('harmonicBPSK');
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('BPSK');

    modulationFrame.x = harmonicFrame.x; // [WARNING] zawsze musi być harmonic frame a nie signalFrame !!! jak bedzie inaczej to się przesuwają sinusy
    harmonicFrame.x.forEach((sample, i) => {
      modulationFrame.y[i] = harmonicFrame.y[i] * signalFrame.y[i];
    });
  }

  qam(modulationType: Modulation.ModulationType) {
    const harmonicFrame = this.getFrame(`harmonic${modulationType}`);
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame(modulationType);

    modulationFrame.x = harmonicFrame.x;

    let i = 0; // index
    let bitBufor = [];
    let quarter;
    let I, Q, A;
    let bits = this.paramsSet.bits;
    const remainder = bits.length % Modulation[modulationType].bitPerSymbol;
    if (remainder !== 0) bits = [...bits, ...<bit[]>(new Array(Modulation[modulationType].bitPerSymbol - remainder + 1).join('0').split('').map(parseFloat))]; // xDDD a tak serio to mamy pustą array ktorą scalamy zerami potem splitujemy potem mapujemy na number[] i rzutujemy na bit[]
    for (let bit of bits) {
      bitBufor.push(bit); // pushnij bita do bufora
      if (bitBufor.length === Modulation[modulationType].bitPerSymbol) {
        quarter = this.bton([bitBufor[0],bitBufor[1]]);
        [I, Q] = this.getIQ(bitBufor.slice(2), modulationType);
        A = this.getAmplitude(I,Q, modulationType);
        // console.log(A,Q,Math.asin(Q/this.pitagoras(I,Q)))
        for (let _i = 0; _i < this.paramsSet.samplingRate; _i++ , i++) {
          // /*QPSK*/modulationFrame.y[i] = Math.sin(harmonicFrame.x[i] * this.paramsSet.frequency * Math.PI * 1000 * 1000 + Math.PI / 4 + 2 * quarter * Math.PI / 4);
          modulationFrame.y[i] = A * Math.sin(harmonicFrame.x[i] * this.paramsSet.frequency * Math.PI * 1000 * 1000 + quarter * Math.PI / 4 + Math.asin(Q/this.pitagoras(I, Q)));
        }
        // console.log(bitBufor)
        bitBufor = [];
      }
    }
  }

  // TODO no jest tak że nie powinniśmy bitów liczyć tylko wartości IQ tam wstawiać

  getIQ(bits: bit[], modulationType: Modulation.ModulationType ) {
    let I = Modulation[modulationType].IQValues[this.bton(bits.slice(0, bits.length / 2))];
    let Q = Modulation[modulationType].IQValues[this.bton(bits.slice(bits.length / 2))];
    // console.log('getIQ', I, Q)
    return [I, Q];
  }

  bton(q: bit[]): number {
    let result = 0;
    q.forEach((bit: bit, i) => result += bit * 2**(q.length - i - 1))
    return result;
  }

  pitagoras(I, Q): number {
    return Math.sqrt(I * I + Q * Q);
  }

  getAmplitude(I, Q, modulationType: Modulation.ModulationType): number {
    return this.pitagoras(I, Q) / Modulation[modulationType].maxAmplitude;
  }

  // endregion
}


