import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParamsSet, Frame } from './interfaces/interfaces';


const formsFields = {
  inputDataLength: [7, Validators.required],
  inputVector: ['110', [Validators.required, Validators.pattern('^[0-1]+$')]],
  inputData: ['0111001', [Validators.required, Validators.pattern('^[0-1]+$')]],
  inputFrequency: ['', Validators.required],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  [x: string]: any;
  // region Parametry
  bits: number[] = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1];
  // endregion

  isScrolled = false;
  generatedInputData=[0, 1, 1, 1, 0, 0, 1];
  inputVectorArray;
  isScrolledF = false;
  firstOn = true;
  menuForm;
  valid=true;
  paramsSet: ParamsSet;
  constructor(private appService: AppService, private fb: FormBuilder ) {
    // this.menuForm = [this.fb.group(formsFields), this.fb.group(formsFields)];
    this.menuForm = [this.fb.group(formsFields)];
  }


  ngOnInit(): void {
    this.inputVectorArray = this.menuForm[0].get('inputVector').value.split("");
    this.paramsSet = new ParamsSet({name: 'BPSK', bits: [0, 1, 1, 1, 0, 0, 1], frequency: 10, periods: 10});

    for(let i=0; i<this.menuForm.length; i++){
      this.menuForm[i].get('inputVector').valueChanges.subscribe(value => {
        this.checkIfValidAndGenerate(this.menuForm[i], 'inputVector');
      });
      this.menuForm[i].get('inputDataLength').valueChanges.subscribe(value => {
        this.checkIfValidAndGenerate(this.menuForm[i], 'inputVector');
      });
      this.menuForm[i].get('inputData').valueChanges.subscribe(value => {
        if(this.menuForm[i].get('inputData').value != '') this.checkIfValidAndGenerate(this.menuForm[i], 'inputData'); //dziwne
        else this.valid=false;
      });
    }

  
  
    // this.menuForm[0].get('inputFrequency').valueChanges.subscribe(value => {
    //   this.paramsSet = new ParamsSet({ name: 'BPSK', bits: this.generatedInputData, frequency: this.menuForm[0].get('inputFrequency').value, periods: 10 });
    // })
  }

  private checkIfValidAndGenerate(form: FormGroup, inputName: string) {
    if (form.get(inputName).value != "" && form.get(inputName).errors == null) {
      this.conductNewInputValues(form, inputName);
      this.valid = true;
    }
    else {
      form.patchValue({ inputData: '' });
      this.valid = false;
    }
  }

  private conductNewInputValues(form: FormGroup, inputName: string) {
    if(inputName === 'inputData')  this.paramsSet = new ParamsSet({ name: 'BPSK', bits: form.get('inputData').value.split(""), frequency: 10, periods: 10 });
    else{
    let generatedInputData = this.randomDataGenerator(form, form.get('inputDataLength').value);
    form.patchValue({ inputData: generatedInputData.toString().replace(/,/g, '') });
    this.paramsSet = new ParamsSet({ name: 'BPSK', bits: generatedInputData, frequency: 10, periods: 10 });
    }
  }

  randomDataGenerator(form: FormGroup, number: number) {
    let inputVectorArray = form.get('inputVector').value.split("");
    let tmpInputVectorArray = inputVectorArray.slice();
    let generatedInputData = [];
      for (let i = 0; i < number; i++) {
        tmpInputVectorArray.unshift(tmpInputVectorArray[inputVectorArray.length - 1] ^ tmpInputVectorArray[tmpInputVectorArray.length - 2]);
        generatedInputData.push(+tmpInputVectorArray[tmpInputVectorArray.length - 1]);
        tmpInputVectorArray.pop();
      }
      return generatedInputData;
  }
  // region New API
  harmonic() {
    const harmonic = this.makeFrame('harmonic');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate * this.paramsSet.bits.length;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency)) {
      harmonic.data[0].x[i] = t * this.paramsSet.scale * this.paramsSet.bits.length;
      harmonic.data[0].y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI);
    }
  }

  signal(bits: bit[]) {
    const signal = this.makeFrame('signal');
    let index = 0;
    let t = 0;
    for (let bit of bits) {
      for (let i = 0; i < this.paramsSet.samplingRate; i++ , t += 1 / this.paramsSet.samplingRate / 1000 / 1000, index++) {
        signal.data[0].x[index] = t * this.paramsSet.scale ;
        if (bit == 0) signal.data[0].y[index] = -1; // == operator because of string type of input data
        else signal.data[0].y[index] = 1;
      }
    }
  }
  // endregion

  // signal2(bits) {
  //   const timeToBit = Math.floor(this.paramsSet.samplingRate / bits.length);
  //   let index = -1;
  //   const frame = this.makeFrame('signal'); // ciekawe, działa można tez przez index signature this['makeFrame']('signal');

  //   for (let i = 0, t = i;
  //     i < this.paramsSet.samplingRate / this.paramsSet.scale;
  //     i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
  //     frame.data[0].x[i] = t * this.paramsSet.scale;
  //     if (i % (timeToBit / this.paramsSet.scale) === 0) {
  //       index++;
  //       if (!bits[index]) bits[index] = -1;
  //     }
  //     frame.data[0].y[i] = bits[index];
  //   }
  // }

  bpsk() {
    const harmonicFrame = this.getFrame('harmonic');
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    // console.log(harmonicFrame, signalFrame, modulationFrame)
    // for (let i = 0, t = i;
    //   i < this.paramsSet.samplingRate / this.paramsSet.scale;
    //   i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
    //   modulationFrame.data[0].x[i] = t * this.paramsSet.scale;
    //   modulationFrame.data[0].y[i] = harmonicFrame.data[0].y[i] * signalFrame.data[0].y[i];
    // }
  }

  qpsk() { // nie testowane
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
      modulationFrame.data[0].x[i] = t * this.paramsSet.scale;

      modulationFrame.data[0].y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI + Math.PI / 4 + 2 * signalFrame.data[0].y[i] * Math.PI / 4);
    }
  }

  qam() {
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('modulation');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
      modulationFrame.data[0].x[i] = t * this.paramsSet.scale;

    }
  }

  getQuarter(q: [bit, bit]) {
    return q[0] * 2 + q[1];
  }

  pitagoras(I, Q) {
    return Math.sqrt(I * I + Q * Q);
  }

  getAmplitude(I, Q, modulation: string) {
    return this.pitagoras(I, Q) / Modulation[modulation].maxAplitude;
  }

  sliderColor(form) {
    const filledPercent = form.get('inputDataLength').value / 20 * 100;
    const empty = 100 - filledPercent;
    return filledPercent >= 50 ? { 'background': 'linear-gradient(to right, #f77750 ' + filledPercent + '%, #d8d4d3 ' + empty + '%)' } : { 'background': 'linear-gradient(to left, #d8d4d3 ' + empty + '%, #f77750 ' + filledPercent + '%)' };
  }

  focusFunction(e) {
    e.target.parentElement.style.borderBottom = '1px solid #f76b40';
  }

  focusOutFunction(e) {
    e.target.parentElement.style.borderBottom = '1px solid #d8d4d3';
  }

}

namespace Modulation{
  export namespace Qam8_16 {
    export type IQValues = 1 | 3;
    export type bitPerSymbol = 4;
    const maxAplitude = Math.sqrt(3 * 3 * 2);
  }
  export namespace Qam64 {
    export type IQValues = 1 | 3 | 5 | 7;
    export type bitPerSymbol = 6;
    const maxAplitude = Math.sqrt(7 * 7 * 2);
  }
}


type bit = 1 | 0;