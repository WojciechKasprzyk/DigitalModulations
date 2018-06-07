import { Component, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParamsSet, Frame, Modulation } from './interfaces/interfaces';


const formsFields = {
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // region Parametry
  bits: number[] = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1];
  // endregion

  modulationTypes = ['BPSK', 'QPSK', '8QAM', '16QAM', '64QAM'];
  generatedInputData = [0, 1, 1, 1, 0, 0, 1];
  inputVectorArray;
  firstOn = true;
  menuForm = [];
  valid = true;
  modulationType: Modulation.ModulationType = 'BPSK';
  paramsSet: ParamsSet;
  constructor(private appService: AppService, private fb: FormBuilder, private elementRef: ElementRef) {
    this.menuForm = [this.fb.group(formsFields)];
  }

  ngOnInit(): void {
    this.paramsSet = new ParamsSet({ name: this.modulationType, bits: [0, 1, 1, 1, 0, 0, 1], frequency: 10, signalFrequency: 1 });
    for (let i = 0; i < this.menuForm.length; i++)
      for (let input in formsFields)
        this.menuForm[i].get(input).valueChanges.subscribe(value => this.conductNewInputValues(this.menuForm[i], input))
  }


  ngAfterViewInit() {
    setTimeout(() => document.getElementsByClassName('menulayer')[0].addEventListener('click', this.getCurrentModulation.bind(this)), 0)
  }

  getCurrentModulation(event) {
    this.modulationType = event.target['innerHTML'] ? event.target['innerHTML'] : event.target['nextElementSibling'].innerHTML;
  }

  private conductNewInputValues(form: FormGroup, inputName: string) {
    if (inputName == "inputVector" || inputName == 'inputDataLength') form.patchValue({ inputData: this.randomDataGenerator(form, form.get('inputDataLength').value).toString().replace(/,/g, '') });
    if (this.checkValid(form) && form.get('inputData').value != "") {
      this.valid = true;
      this.paramsSet = new ParamsSet({ name: this.modulationType, bits: form.get('inputData').value.split(""), frequency: form.get('carryFrequency').value, signalFrequency: form.get('signalFrequency').value });
      setTimeout(() => document.getElementsByClassName('menulayer')[0].addEventListener('click', this.getCurrentModulation.bind(this)), 0)
    }
    else this.valid = false;
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

  ngOnDestroy(): void {
    document.getElementsByClassName('menulayer')[0].removeEventListener('click', this.getCurrentModulation.bind(this));
  }
}