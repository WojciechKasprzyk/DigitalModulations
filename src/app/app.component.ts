import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OnInit, AfterViewInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParamsSet, Frame } from './interfaces/interfaces';


const formsFields = {
  modulation: ['BPSK', Validators.required],
  inputDataLength: [7, Validators.required],
  inputVector: ['110', [Validators.pattern('^[0-1]+$')]],
  inputData: ['0111001', [Validators.pattern('^[0-1]+$')]],
  carryFrequency: ['10', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
  signalFrequency: ['1', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]]
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

  modulationTypes = ['BPSK', 'QPSK', '8QAM', '16QAM', '64QAM'];
  generatedInputData = [0, 1, 1, 1, 0, 0, 1];
  inputVectorArray;
  firstOn = true;
  menuForm;
  showOptions=false;
  valid = true;
  paramsSet: ParamsSet;
  constructor(private appService: AppService, private fb: FormBuilder) {
    // this.menuForm = [this.fb.group(formsFields), this.fb.group(formsFields)];
    this.menuForm = [this.fb.group(formsFields)];
  }

  ngOnInit(): void {
    this.paramsSet = new ParamsSet({ name: 'BPSK', bits: [0, 1, 1, 1, 0, 0, 1], frequency: 10, signalFrequency: 1 });
    for (let i = 0; i < this.menuForm.length; i++)
      for (let input in formsFields) 
        this.menuForm[i].get(input).valueChanges.subscribe(value => this.conductNewInputValues(this.menuForm[i], input))
  
        // this.menuForm[0].get('modulation').valueChanges.subscribe(value => this.show());
      }

  private conductNewInputValues(form: FormGroup, inputName: string) {
    if (inputName == "inputVector" || inputName == 'inputDataLength') form.patchValue({ inputData: this.randomDataGenerator(form, form.get('inputDataLength').value).toString().replace(/,/g, '') });
    if (this.checkValid(form) && form.get('inputData').value != "") {
      this.valid = true;
      this.paramsSet = new ParamsSet({ name: 'BPSK', bits: form.get('inputData').value.split(""), frequency: form.get('carryFrequency').value, signalFrequency: form.get('signalFrequency').value });
    }
    else {
      this.valid = false;
    }
  }

  private randomDataGenerator(form: FormGroup, n: number) {
    let inputVectorArray = form.get('inputVector').value.split("");
    let tmpInputVectorArray = inputVectorArray.slice();
    let generatedInputData = [];
    for (let i = 0; i < n; i++) {
      tmpInputVectorArray.unshift(tmpInputVectorArray[inputVectorArray.length - 1] ^ tmpInputVectorArray[tmpInputVectorArray.length - 2]);
      generatedInputData.push(+tmpInputVectorArray[tmpInputVectorArray.length - 1]);
      tmpInputVectorArray.pop();
    }
    return generatedInputData;
  }

  private checkValid(form) {
    for (let input in formsFields) if (form.get(input).errors != null) return false;
    return true;
  }
  
  showe(){
    this.showOptions = !this.showOptions;

  }
  show(e, i){
    e.stopPropagation();
    this.showOptions = !this.showOptions;
    this.menuForm[0].patchValue({ modulation: i});
  }
  // region New API

  bpsk() {
    const harmonicFrame = this.getFrame('harmonic');
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    modulationFrame.x = signalFrame.x; // or harmnicFrame.data.x
    signalFrame.x.forEach((sample, i) => {
      modulationFrame.y[i] = harmonicFrame.y[i] * signalFrame.y[i];
    });
  }

  qpsk() { // wymaga nowego sygnału
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('modulation');

    modulationFrame.x = signalFrame.x;

    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate * this.paramsSet.bits.length;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * 1000 * 1000)) {
      modulationFrame.y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI * 1000 * 1000 + Math.PI / 4 + 2 * signalFrame.data * Math.PI / 4);
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


  qam() {
    const signalFrame = this.getFrame('signal');
    const modulationFrame = this.makeFrame('modulation');
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
      modulationFrame.data[0].x[i] = t * this.paramsSet.scale;

    }
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

namespace Modulation {
  export namespace Qpsk {
    export type IQValues = 1 | 3;
    export type bitPerSymbol = 2;
    const maxAplitude = Math.sqrt(3 * 3 * 2);
  }
  export namespace Qam8 {
    export type IQValues = 1 | 3;
    export type bitPerSymbol = 3;
    const maxAplitude = Math.sqrt(3 * 3 * 2);
  }
  export namespace Qam16 {
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